import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../start/routing/auth.guard';
import { DefaultPreferencesComponent } from './components/default-preferences/default-preferences.component';

const routes: Routes = [
  {
    path: '', component: DefaultPreferencesComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreferencesRoutingModule { }
