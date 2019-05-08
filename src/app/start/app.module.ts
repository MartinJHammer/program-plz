import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatSelectModule } from '@angular/material/select';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';


import { AppRoutingModule } from './app-routing.module';
import { StartComponent } from './../components/start/start.component';
import { environment } from 'src/environments/environment';

import { pipes } from '../pipes/pipes';
import { components } from '../components/components';
import { directives } from '../directives/directives';
import { crudComponents } from '../crud/components/crud-components';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    ScrollDispatchModule,
    DragDropModule,
    MatSelectModule
  ],
  declarations: [
    ...components,
    ...crudComponents,
    ...directives,
    ...pipes
  ],
  providers: [],
  bootstrap: [StartComponent]
})
export class AppModule { }
