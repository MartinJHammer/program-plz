import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from '../components/components';
import { UsersRoutingModule } from './users.routing.module';

@NgModule({

  imports: [
    CommonModule,
    UsersRoutingModule
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ]
})
export class UsersModule { }
