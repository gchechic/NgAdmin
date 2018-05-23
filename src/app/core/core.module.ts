import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { SharedModule } from '../shared/shared.module';
import { ToastService } from './toast.service';
import { LoginService } from '../login/login.service';
import { ConfigServiceService } from './config.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule // because we use <router-outlet> and routerLink
  ],
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent],
  providers: [ToastService, LoginService, ConfigServiceService]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
