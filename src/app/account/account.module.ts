import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from './components/components';
import { AccountRoutingModule } from './account.routing.module';
import { UiModule } from '../ui/ui.module';

@NgModule({

  imports: [
    CommonModule,
    AccountRoutingModule,
    UiModule
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ]
})
export class AccountModule { }
