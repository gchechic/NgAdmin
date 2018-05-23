import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { User } from '../models';
import { ConfigServiceService } from '../core/config.service';
import { LoginService } from '../login/login.service';

@Injectable()
export class UserDataService {
  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService,
    private configService: ConfigServiceService
  ) {}
  getUsers() {
    const url = `${this.configService.urlApi}/users`;

    const httpOptions = {
      headers: this.loginService.AutHeaders()
    };

    return this.httpClient.get<User[]>(url, httpOptions);
  }
}
