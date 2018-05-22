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
  errorMsg: string;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.username = null;
    this.errorMsg = 'Error!';
  }
  login() {
    this.showSpinner = true;
    this.loginService.login(this.username, this.password).subscribe(
      resp => console.log(resp),
      errorMsg => {
        this.errorMsg = errorMsg;
        this.showSpinner = false;
      },
      () => {
        console.log('fin?');
        this.showSpinner = false;
      }
    );
  }
}
