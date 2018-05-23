import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { SharedModule } from '../shared/shared.module';
import { ToastService } from './toast.service';
import { ConfigServiceService } from './config.service';
import { AuthInterceptor } from './auth-interceptor';
import { AuthService } from './auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule // because we use <router-outlet> and routerLink
  ],
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent],
  providers: [
    ToastService,
    ConfigServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    ,
    AuthService
  ]
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
