import { Component, OnInit } from '@angular/core';

import { User } from '../../models';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'adm-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[];
  constructor(private userDataService: UserDataService) {}

  ngOnInit() {
    this.userDataService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}
