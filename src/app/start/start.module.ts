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

import { components, entryComponents } from '../components/components';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StartRoutingModule } from './start-routing.module';
import { CrudModule } from '../crud/crud.module';
import { SearchModule } from '../search/search.module';

@NgModule({
  imports: [
    BrowserModule,
    StartRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CrudModule,
    SearchModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
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
    // PWA
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [
    ...components
  ],
  entryComponents: [...entryComponents],
  providers: [],
  bootstrap: [StartComponent]
})
export class StartModule { }
