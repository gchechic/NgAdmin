import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewChecked
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'adm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewChecked {
  showSpinner = false;
  username: string;
  password: string;
  errorMsg: string;

  private loginForm: NgForm;
  private subscrs: Subscription;
  @ViewChild('loginForm') currentForm: NgForm;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.username = null;
    this.errorMsg = null;
  }
  ngOnDestroy() {
    if (this.subscrs) {
      this.subscrs.unsubscribe();
    }
  }
  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.loginForm) {
      return;
    }
    this.loginForm = this.currentForm;
    if (this.currentForm) {
      this.subscrs = this.currentForm.valueChanges.subscribe(data => {
        this.errorMsg = null;
      });
    }
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
