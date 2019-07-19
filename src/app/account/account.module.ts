import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from './components/components';
import { AccountRoutingModule } from './account.routing.module';

@NgModule({

  imports: [
    CommonModule,
    AccountRoutingModule
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ]
})
export class AccountModule { }
