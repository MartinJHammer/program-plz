import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramComponent } from './components/program/program.component';
import { ExercisesComponent } from './components/exercises/exercises.component';

const routes: Routes = [
  {
    path: '', component: ProgramComponent
  },
  {
    path: 'exercises', component: ExercisesComponent
  },
  { path: '**', component: ProgramComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
