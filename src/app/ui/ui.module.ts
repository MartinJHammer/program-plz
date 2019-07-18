import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from '../components/components';
import { UiRoutingModule } from './ui.routing.module';

@NgModule({

  imports: [
    CommonModule,
    UiRoutingModule
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ]
})
export class UiModule { }
