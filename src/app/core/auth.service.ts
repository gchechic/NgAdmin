import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, tap, catchError, shareReplay } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import * as moment from 'moment';

import { ConfigServiceService } from '../core/config.service';

@Injectable()
export class AuthService {
  // private authtoken;
  private storage: Storage;
  private logger: BehaviorSubject<boolean>;
  private islogged = false;

  public isLogged$: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private configServiceService: ConfigServiceService
  ) {
    this.storage = localStorage;
    this.logger = new BehaviorSubject<boolean>(false);
    this.isLogged$ = this.logger.asObservable();
    this.isLoggedIn(); // ejecutar para que logger emita valor actual
  }

  /// esta propiedad es usada por el http interceptor
  get token(): string {
    return this.storage.getItem('access_token');
  }

  get user(): string {
    return this.storage.getItem('user');
  }

  login(usr: string, pwd: string) {
    this.clearSession(); // borrar el token actual
    const creds = `grant_type=password&username=${usr}&password=${pwd}`;
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this.http
      .post(`${this.configServiceService.urlServer}/token`, creds, {
        headers: headers,
        responseType: 'json'
      })
      .pipe(
        tap(resp => {
          this.setSession(resp);
          this.logger.next(true);
        }),
        shareReplay(),
        catchError((err: HttpErrorResponse) => {
          if (err.status === 400) {
            return throwError('Usuario o Clave Incorrectos.');
          } else {
            return throwError('Ha ocurrido un error inesperado.');
          }
        })
      );
  }

  logout() {
    // TODO: ver si hay que ejecutar algo en el server
    this.clearSession();
    this.logger.next(false);
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expires_in, 'second');
    this.storage.setItem('access_token', authResult.access_token);
    this.storage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    this.storage.setItem('user', authResult.userName);
  }

  private clearSession() {
    this.storage.removeItem('access_token');
    this.storage.removeItem('expires_at');
    this.storage.removeItem('user');
  }

  public isLoggedIn() {
    const bLogged = moment().isBefore(this.getExpiration());
    if (this.logger.value !== bLogged) {
      this.logger.next(bLogged);
    }
    return bLogged;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  private getExpiration() {
    const expiration = this.storage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
