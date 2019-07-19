import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageComponent } from '../components/manage/manage.component';
import { AuthGuard } from '../route-guards/auth.guard';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';
import { LoginComponent } from '../components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'manage', component: ManageComponent, canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: '../program/program.module#ProgramModule'
  },
  {
    path: 'exercises',
    loadChildren: '../exercises/exercises.module#ExercisesModule'
  },
  {
    path: 'exercise-types',
    loadChildren: '../exercise-types/exercise-types.module#ExerciseTypesModule'
  },
  {
    path: 'attributes',
    loadChildren: '../attributes/attributes.module#AttributesModule'
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class StartRoutingModule { }
