import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from './components/components';
import { FormRoutingModule } from './form.routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UiModule } from '../ui/ui.module';
import { CheckedPipe } from './components/multi-select-field/checked.pipe';

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormRoutingModule,
    UiModule
  ],
  declarations: [
    ...components,
    CheckedPipe
  ],
  exports: [
    ...components
  ]
})
export class FormModule { }
