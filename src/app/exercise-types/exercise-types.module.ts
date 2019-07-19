import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseTypesRoutingModule } from './exercise-types.routing.module';
import { CrudModule } from '../crud/crud.module';
import { components } from './components/components';

@NgModule({
  imports: [
    CommonModule,
    ExerciseTypesRoutingModule,
    CrudModule
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ]
})
export class ExerciseTypesModule { }
