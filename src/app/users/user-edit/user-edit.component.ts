import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material';
import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';

@Component({
  selector: 'adm-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  animal: string;
  name: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    // TODO: SI SE CLICKEA LA MISMA RUTA EL OBSERVABLE NO SE EJECUTA
    // const id = this.route.snapshot.paramMap.get('id');
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.name = params.get('id');
      console.log(this.name);
      setTimeout(() => {
        this.openDialog();
      });
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      width: 'auto',
      data: { name: this.name, animal: this.animal },
      disableClose: true,
      hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
