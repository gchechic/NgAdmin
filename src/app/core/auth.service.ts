import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';

import { ConfigServiceService } from '../core/config.service';

@Injectable()
export class AuthService {
  private authtoken;
  get token(): string {
    return this.authtoken;
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

  login(usr: string, pwd: string): Observable<boolean> {
    this.authtoken = null; // borrar el token actual
    const creds = `grant_type=password&username=${usr}&password=${pwd}`;
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this.http
      .post(`${this.configServiceService.urlServer}/token`, creds, {
        headers: headers,
        responseType: 'text'
      })
      .pipe(
        map(resp => {
          // this.saveJwt(resp);
          if (resp && JSON.parse(resp)['access_token']) {
            this.authtoken = JSON.parse(resp)['access_token'];
            return true;
          }
          return false;
        }),
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

  // saveJwt(jwt) {
  //   const json = jwt !== '' ? JSON.parse(jwt) : undefined;
  //   this._token = jwt !== '' ? json.access_token : '';
  //   // this._tokenrodi = jwt !== '' ? json.tokenRodi : '';
  //   this._userName = jwt !== '' ? json.userName : '';
  //   sessionStorage.setItem('user', this._userName);

  //   if (jwt !== '') {
  //     const account: any = {
  //       token: json.access_token,
  //       tokenrodi: json.tokenRodi,
  //       user: json.userName
  //     };
  //     localStorage.setItem('account', JSON.stringify(account));
  //     // Cookie.set('BearerToken', this._token, 10  , '/' , 'sba.com.ar') ;
  //     // console.log(account);
  //     Cookie.set(
  //       'BearerToken',
  //       this._token,
  //       10,
  //       '/',
  //       this.configService.domain
  //     );
  //     // Cookie.set('BearerToken', this._token, 10  , '/', '') ;
  //   } else {
  //     localStorage.clear();
  //     // Cookie.delete('BearerToken', '/' , this.configService.domain) ;
  //   }
  // }
  // public borrarCookieSignalR() {
  //   // console.log('borrarCookieSignalR');
  //   Cookie.delete('BearerToken', '/', this.configService.domain);
  // }

  // public HandleError(error: any) {
  //   if (error.status === 403) {
  //     this._router.navigate(['/Forbidden']);
  //   } else if (error.status === 401) {
  //     this._router.navigate(['/Unauthorized']);
  //   }
  // }
}
