import { Injectable } from '@angular/core';

@Injectable()
export class ConfigServiceService {
  // const url = 'https://webapi20180405123802.azurewebsites.net/api/users';
  // const url = 'http://localhost:13617/api/users';
  urlServer = 'https://adminng.azurewebsites.net';
  // urlServer = 'http://localhost:8589';

  urlApi = `${this.urlServer}/api`;
}
