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

const routes: Routes = [
  {
    path: '', component: ProgramComponent
  },
  {
    path: 'manage', component: ManageComponent
  },
  {
    path: 'exercises', component: ExercisesIndexComponent
  },
  {
    path: 'create', component: ExercisesCreateComponent
  },
  {
    path: 'edit/:id', component: ExercisesEditComponent
  },
  {
    path: 'exercise-types', component: ExerciseTypesIndexComponent
  },
  {
    path: 'create', component: ExerciseTypesCreateComponent
  },
  {
    path: 'edit/:id', component: ExerciseTypesEditComponent
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
