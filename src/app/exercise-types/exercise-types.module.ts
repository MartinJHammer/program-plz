import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from '../components/components';
import { ExerciseTypesRoutingModule } from './exercise-types.routing.module';

@NgModule({

  imports: [
    CommonModule,
    ExerciseTypesRoutingModule
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ]
})
export class ExerciseTypesModule { }
