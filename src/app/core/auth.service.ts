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
  get token(): string {
    return localStorage.getItem('access_token');
  }

  constructor(
    private http: HttpClient,
    private configServiceService: ConfigServiceService
  ) {}

  // AutHeaders(): HttpHeaders {
  //   return new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${this.authtoken}`
  //   });
  // }

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

  // private handleLoginError(error: HttpErrorResponse | any) {
  //   return Observable.throw(error);
  // }
  private setSession(authResult) {
    // console.log(authResult.access_token, authResult.expiresIn);
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  private clearSession() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  private getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
