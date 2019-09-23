import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../program/program.module').then(m => m.ProgramModule)
  },
  {
    path: 'account',
    loadChildren: () => import('../account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'exercises',
    loadChildren: () => import('../exercises/exercises.module').then(m => m.ExercisesModule)
  },
  {
    path: 'exercise-types',
    loadChildren: () => import('../exercise-types/exercise-types.module').then(m => m.ExerciseTypesModule)
  },
  {
    path: 'attributes',
    loadChildren: () => import('../attributes/attributes.module').then(m => m.AttributesModule)
  },
  {
    path: 'equipment',
    loadChildren: () => import('../equipment/equipment.module').then(m => m.EquipmentModule)
  },
  {
    path: 'default-preferences',
    loadChildren: () => import('../preferences/preferences.module').then(m => m.PreferencesModule)
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class StartRoutingModule { }
