import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from '../components/components';
import { AttributesRoutingModule } from './attributes.routing.module';

@NgModule({

  imports: [
    CommonModule,
    AttributesRoutingModule
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ]
})
export class AttributesModule { }
