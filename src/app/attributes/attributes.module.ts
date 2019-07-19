import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttributesRoutingModule } from './attributes.routing.module';
import { components } from './components/components';
import { CrudModule } from '../crud/crud.module';

@NgModule({
  imports: [
    CommonModule,
    AttributesRoutingModule,
    CrudModule
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ]
})
export class AttributesModule { }
