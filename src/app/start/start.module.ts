import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';


import { StartComponent } from './../components/start/start.component';
import { environment } from 'src/environments/environment';

import { pipes } from '../pipes/pipes';
import { components, entryComponents } from '../components/components';
import { directives } from '../directives/directives';
import { crudComponents } from '../crud/components/crud-components';
import { NgAisModule } from 'angular-instantsearch';
import { searchComponents } from '../search/search-components';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StartRoutingModule } from './start-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    StartRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgAisModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    // Angular material/cdk/flex-layout
    ScrollDispatchModule,
    FlexLayoutModule,
    DragDropModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatCheckboxModule,
    // PWA
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [
    ...components,
    ...crudComponents,
    ...searchComponents,
    ...directives,
    ...pipes
  ],
  entryComponents: [...entryComponents],
  providers: [],
  bootstrap: [StartComponent]
})
export class StartModule { }
