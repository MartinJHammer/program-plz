import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudRoutingModule } from './crud-routing.module';
import { SearchModule } from '../search/search.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CrudIndexComponent } from './components/crud-index/crud-index.component';
import { components } from './components/components';
import { MatSelectModule } from '@angular/material/select';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  imports: [
    CommonModule,
    CrudRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SearchModule,
    // Angular material/cdk/flex-layout
    FlexLayoutModule,
    ScrollDispatchModule,
    MatCheckboxModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
  declarations: [
    ...components,
  ],
  exports: [
    CrudIndexComponent,
  ]
})
export class CrudModule { }
