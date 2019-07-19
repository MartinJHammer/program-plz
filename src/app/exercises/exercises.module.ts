import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExercisesRoutingModule } from './exercises.routing.module';
import { components } from './components/components';
import { CrudModule } from '../crud/crud.module';

@NgModule({
  imports: [
    CommonModule,
    CrudModule,
    ExercisesRoutingModule
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ]
})
export class ExercisesModule { }
