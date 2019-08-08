import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { searchComponents } from './components/search-components';
import { NgAisModule } from 'angular-instantsearch';
import { UiModule } from '../ui/ui.module';

@NgModule({

  imports: [
    CommonModule,
    SearchRoutingModule,
    UiModule,
    NgAisModule.forRoot()
  ],
  declarations: [
    ...searchComponents
  ],
  exports: [
    ...searchComponents
  ]
})
export class SearchModule { }
