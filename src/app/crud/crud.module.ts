import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { crudComponents } from './components/crud-components';
import { CrudRoutingModule } from './crud-routing.module';
import { SearchModule } from '../search/search.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CheckedPipe } from './components/fields/multi-select-field/checked.pipe';
import { CrudIndexComponent } from './components/crud-index/crud-index.component';
import { FormComponent } from './components/form/form.component';


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
    DragDropModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatCheckboxModule,
  ],
  declarations: [
    ...crudComponents,
    CheckedPipe
  ],
  exports: [
    CrudIndexComponent,
    FormComponent
  ]
})
export class CrudModule { }
