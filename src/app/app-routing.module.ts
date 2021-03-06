import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PathNotFoundComponent } from './path-not-found/path-not-found.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/guards';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  {
    path: 'users',
    loadChildren: 'app/users/users.module#UsersModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'procesos',
    loadChildren: 'app/procesos/procesos.module#ProcesosModule',
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch: 'full', component: PathNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
