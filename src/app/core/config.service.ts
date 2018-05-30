import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class ConfigServiceService {
  // const url = 'https://webapi20180405123802.azurewebsites.net/api/users';
  // const url = 'http://localhost:13617/api/users';
  urlServer = 'https://adminng.azurewebsites.net';
  // urlServer = 'http://localhost:8589';
  urlApi = `${this.urlServer}/api`;
  constructor() {
    if (!environment.production) {
      // this.urlServer = 'http://localhost:8589';
      this.urlServer = 'https://adminng.azurewebsites.net';
      this.urlApi = `${this.urlServer}/api`;
    }
  }
}
