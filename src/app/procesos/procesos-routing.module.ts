import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProcesosListComponent } from './procesos-list/procesos-list.component';
const routes: Routes = [
  {
    path: '',
    component: ProcesosListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcesosRoutingModule {}
