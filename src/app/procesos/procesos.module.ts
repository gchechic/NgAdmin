import { NgModule } from '@angular/core';

import { ProcesosListComponent } from './procesos-list/procesos-list.component';
import { SharedModule } from '../shared/shared.module';
import { ProcesosRoutingModule } from './procesos-routing.module';
import { ProcesosComponent } from './procesos.component';

@NgModule({
  imports: [ProcesosRoutingModule, SharedModule],
  declarations: [ProcesosListComponent, ProcesosComponent]
})
export class ProcesosModule {}
