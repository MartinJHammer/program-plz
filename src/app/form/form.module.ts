import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from './components/components';
import { FormRoutingModule } from './form.routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UiModule } from '../ui/ui.module';
import { DynamicFormFieldDirective } from './components/dynamic-form-field-directive';
import { UtilitiesModule } from '../utilities/utilities.module';

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormRoutingModule,
    UtilitiesModule,
    UiModule
  ],
  declarations: [
    ...components,
    DynamicFormFieldDirective,
  ],
  entryComponents: [
    ...components
  ],
  exports: [
    ...components
  ]
})
export class FormModule { }
