import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramComponent } from './components/program/program.component';
import { ExerciseIndexComponent } from './components/exercises-index/exercises-index.component';

const routes: Routes = [
  {
    path: '', component: ProgramComponent
  },
  {
    path: 'exercises', component: ExerciseIndexComponent
  },
  { path: '**', component: ProgramComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
