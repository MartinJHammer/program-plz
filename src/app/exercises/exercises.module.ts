import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from '../components/components';
import { ExercisesRoutingModule } from './exercises.routing.module';

@NgModule({

  imports: [
    CommonModule,
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
