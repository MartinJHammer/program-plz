import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgAisModule } from 'angular-instantsearch';
import { components } from '../components/components';
import { AttributesRoutingModule } from './attributes.routing.module';

@NgModule({

  imports: [
    CommonModule,
    AttributesRoutingModule,
    NgAisModule.forRoot(),
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ]
})
export class AttributesModule { }
