import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';
import { UserDataService } from './user-data.service';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserEditDialogComponent } from './user-edit-dialog/user-edit-dialog.component';

@NgModule({
  imports: [UsersRoutingModule, SharedModule, FormsModule],
  declarations: [UsersComponent, UserEditComponent, UserEditDialogComponent],
  entryComponents: [UserEditDialogComponent],
  providers: [UserDataService]
})
export class UsersModule {}
