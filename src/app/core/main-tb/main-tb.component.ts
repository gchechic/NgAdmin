import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'adm-main-tb',
  templateUrl: './main-tb.component.html',
  styleUrls: ['./main-tb.component.scss']
})
export class MainTbComponent implements OnInit, OnDestroy {
  @Output() toggleMenuClicked = new EventEmitter();
  usuario: string;

  isloged: boolean;
  private subsc: Subscription;
  constructor(private authService: AuthService) {}

  onClickbtnMenu() {
    this.toggleMenuClicked.emit();
  }
  ngOnInit() {
    this.subsc = this.authService.isLogged$.subscribe(resp => {
      this.isloged = resp;
      this.usuario = this.authService.user;
    });
  }
  ngOnDestroy() {
    this.subsc.unsubscribe();
  }
  logout() {
    this.authService.logout();
  }
}
