import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'adm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showSpinner = false;
  username: string;
  password: string;

  constructor(private loginService: LoginService) {}

  ngOnInit() {}
  login() {
    this.showSpinner = true;
    this.loginService.login(this.username, this.password).subscribe(
      resp => console.log(resp),
      error => {
        console.log(error);
        this.showSpinner = false;
      },
      () => (this.showSpinner = false)
    );
  }
}
