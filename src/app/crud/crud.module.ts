import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudRoutingModule } from './crud-routing.module';
import { SearchModule } from '../search/search.module';
import { CrudIndexComponent } from './components/crud-index/crud-index.component';
import { components } from './components/components';
import { UiModule } from '../ui/ui.module';
import { FormModule } from '../form/form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormModule,
    SearchModule,
    CrudRoutingModule,
    UiModule,
  ],
  declarations: [
    ...components,
  ],
  exports: [
    CrudIndexComponent,
    FormModule
  ]
})
export class CrudModule { }
