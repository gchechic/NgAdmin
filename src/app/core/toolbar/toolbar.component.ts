import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'adm-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  isloged: boolean;
  private subsc: Subscription;
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.subsc = this.authService.isLogged$.subscribe(resp => {
      this.isloged = resp;
    });
  }
  ngOnDestroy() {
    this.subsc.unsubscribe();
  }
  logout() {
    this.authService.logout();
  }
}
