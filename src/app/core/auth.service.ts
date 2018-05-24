import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
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

  constructor(
    private http: HttpClient,
    private configServiceService: ConfigServiceService
  ) {
    this.storage = localStorage;
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
        }),
        shareReplay(),
        catchError((err: HttpErrorResponse) => {
          console.log(err);
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
  }

  private setSession(authResult) {
    console.log(authResult.expires_in);
    const expiresAt = moment().add(authResult.expires_in, 'second');
    console.log(expiresAt);
    this.storage.setItem('access_token', authResult.access_token);
    this.storage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    this.storage.setItem('user', authResult.usrName);
  }

  private clearSession() {
    this.storage.removeItem('access_token');
    this.storage.removeItem('expires_at');
    this.storage.removeItem('user');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
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
