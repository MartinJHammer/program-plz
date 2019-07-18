import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { searchComponents } from './components/search-components';
import { NgAisModule } from 'angular-instantsearch';

@NgModule({

  imports: [
    CommonModule,
    SearchRoutingModule,
    NgAisModule.forRoot(),
  ],
  declarations: [
    ...searchComponents
  ],
  exports: [
    ...searchComponents
  ]
})
export class SearchModule { }
