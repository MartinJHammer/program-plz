import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramComponent } from './components/program/program.component';
import { ExercisesIndexComponent } from './components/exercises/exercises-index/exercises-index.component';
import { ExercisesCreateComponent } from './components/exercises/exercises-create/exercises-create.component';
import { ExercisesEditComponent } from './components/exercises/exercises-edit/exercises-edit.component';

const routes: Routes = [
  {
    path: '', component: ProgramComponent
  },
  {
    path: 'exercises', component: ExercisesIndexComponent
  },
  {
    path: 'exercises/create', component: ExercisesCreateComponent
  },
  {
    path: 'exercises/edit/:id', component: ExercisesEditComponent
  },
  { path: '**', component: ProgramComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
