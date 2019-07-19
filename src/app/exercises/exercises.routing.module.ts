import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExercisesIndexComponent } from './components/exercises-index/exercises-index.component';
import { ExercisesCreateComponent } from './components/exercises-create/exercises-create.component';
import { ExercisesEditComponent } from './components/exercises-edit/exercises-edit.component';
import { AuthGuard } from '../start/routing/auth.guard';

const routes: Routes = [
  {
    path: '', component: ExercisesIndexComponent, canActivate: [AuthGuard]
  },
  {
    path: 'create', component: ExercisesCreateComponent, canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id', component: ExercisesEditComponent, canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExercisesRoutingModule { }
