import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramRoutingModule } from './program.routing.module';
import { components, entryComponents } from './components/components';
import { UiModule } from '../ui/ui.module';

@NgModule({

  imports: [
    CommonModule,
    ProgramRoutingModule,
    UiModule
  ],
  declarations: [
    ...components
  ],
  entryComponents: [
    ...entryComponents
  ],
  exports: [
    ...components
  ]
})
export class ProgramModule { }
