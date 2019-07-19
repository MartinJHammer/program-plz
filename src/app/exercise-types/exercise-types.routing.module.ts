import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../route-guards/auth.guard';
import { ExerciseTypesIndexComponent } from './components/exercise-types-index/exercise-types-index.component';
import { ExerciseTypesCreateComponent } from './components/exercise-types-create/exercise-types-create.component';
import { ExerciseTypesEditComponent } from './components/exercise-types-edit/exercise-types-edit.component';

const routes: Routes = [
  {
    path: '', component: ExerciseTypesIndexComponent, canActivate: [AuthGuard]
  },
  {
    path: 'create', component: ExerciseTypesCreateComponent, canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id', component: ExerciseTypesEditComponent, canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExerciseTypesRoutingModule { }
