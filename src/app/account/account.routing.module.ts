import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AccountComponent } from './components/account/account.component';
import { AuthGuard } from '../start/routing/auth.guard';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'profile', component: AccountComponent, canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
