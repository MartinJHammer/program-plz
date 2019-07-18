import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from '../components/components';
import { ProgramRoutingModule } from './program.routing.module';

@NgModule({

  imports: [
    CommonModule,
    ProgramRoutingModule
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ]
})
export class ProgramModule { }
