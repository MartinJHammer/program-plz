import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramComponent } from './../components/program/program.component';
import { ExercisesIndexComponent } from './../components/exercises/exercises-index/exercises-index.component';
import { ExercisesCreateComponent } from './../components/exercises/exercises-create/exercises-create.component';
import { ExercisesEditComponent } from './../components/exercises/exercises-edit/exercises-edit.component';
import { ExerciseTypesIndexComponent } from '../components/exercise-types/exercise-types-index/exercise-types-index.component';
import { ExerciseTypesCreateComponent } from '../components/exercise-types/exercise-types-create/exercise-types-create.component';
import { ExerciseTypesEditComponent } from '../components/exercise-types/exercise-types-edit/exercise-types-edit.component';
import { ManageComponent } from '../components/manage/manage.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { AuthGuard } from '../route-guards/auth.guard';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';
import { LoginComponent } from '../components/login/login.component';

const routes: Routes = [
  {
    path: '', component: ProgramComponent
  },
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
    path: 'exercises', component: ExercisesIndexComponent, canActivate: [AuthGuard]
  },
  {
    path: 'exercises/create', component: ExercisesCreateComponent, canActivate: [AuthGuard]
  },
  {
    path: 'exercises/edit/:id', component: ExercisesEditComponent, canActivate: [AuthGuard]
  },
  {
    path: 'exercise-types', component: ExerciseTypesIndexComponent, canActivate: [AuthGuard]
  },
  {
    path: 'exercise-types/create', component: ExerciseTypesCreateComponent, canActivate: [AuthGuard]
  },
  {
    path: 'exercise-types/edit/:id', component: ExerciseTypesEditComponent, canActivate: [AuthGuard]
  },
  {
    path: 'exercise-types/edit/:id', component: ExerciseTypesEditComponent
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
