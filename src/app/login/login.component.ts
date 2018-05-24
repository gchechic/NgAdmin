import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewChecked
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  private returnUrl: string;

  private loginForm: NgForm;
  private subscrs: Subscription;
  @ViewChild('loginForm') currentForm: NgForm;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.username = null;
    this.errorMsg = null;
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
    this.authService
      .login(this.username, this.password)
      .pipe(
        finalize(() => {
          this.showSpinner = false;
        })
      )
      .subscribe(
        null,
        errorMsg => {
          this.errorMsg = errorMsg;
        },
        () => {
          this.router.navigateByUrl(this.returnUrl);
        }
      );
  }
}
