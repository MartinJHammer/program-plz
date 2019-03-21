import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramComponent } from './components/program/program.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { FrontPageComponent } from './components/front-page/front-page.component';

const routes: Routes = [
  {
    path: '', component: FrontPageComponent
  },
  {
    path: 'program', component: ProgramComponent
  },
  {
    path: 'exercises', component: ExercisesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
