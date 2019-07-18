import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from '../components/components';
import { FormRoutingModule } from './form.routing.module';

@NgModule({

  imports: [
    CommonModule,
    FormRoutingModule
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ]
})
export class FormModule { }
