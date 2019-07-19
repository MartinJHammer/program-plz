import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../route-guards/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ManageComponent } from './components/manage/manage.component';

const routes: Routes = [
  {
    path: 'manage', component: ManageComponent, canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: '../program/program.module#ProgramModule'
  },
  {
    path: 'account',
    loadChildren: '../account/account.module#AccountModule'
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
