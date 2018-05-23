import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { User } from '../models';
import { ConfigServiceService } from '../core/config.service';

@Injectable()
export class UserDataService {
  constructor(
    private httpClient: HttpClient,
    private configService: ConfigServiceService
  ) {}
  getUsers() {
    const url = `${this.configService.urlApi}/users`;

    return this.httpClient.get<User[]>(url);
  }
}
