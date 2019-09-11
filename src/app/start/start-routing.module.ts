import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
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
  {
    path: 'equipment',
    loadChildren: '../equipment/equipment.module#EquipmentModule'
  },
  {
    path: 'default-preferences',
    loadChildren: '../preferences/preferences.module#PreferencesModule'
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class StartRoutingModule { }
