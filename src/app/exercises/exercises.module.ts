import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgAisModule } from 'angular-instantsearch';
import { components } from '../components/components';
import { ExercisesRoutingModule } from './exercises.routing.module';

@NgModule({

  imports: [
    CommonModule,
    ExercisesRoutingModule,
    NgAisModule.forRoot(),
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ]
})
export class ExercisesModule { }
