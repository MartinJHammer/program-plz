import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgAisModule } from 'angular-instantsearch';
import { components } from '../components/components';
import { ExerciseTypesRoutingModule } from './exercise-types.routing.module';

@NgModule({

  imports: [
    CommonModule,
    ExerciseTypesRoutingModule,
    NgAisModule.forRoot(),
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ]
})
export class ExerciseTypesModule { }
