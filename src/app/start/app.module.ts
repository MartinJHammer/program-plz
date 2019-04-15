import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { StartComponent } from './../components/start/start.component';
import { environment } from 'src/environments/environment';

import { pipes } from '../pipes/pipes';
import { components } from '../components/components';
import { directives } from '../directives/directives';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  declarations: [
    ...components,
    ...directives,
    ...pipes
  ],
  providers: [],
  bootstrap: [StartComponent]
})
export class AppModule { }
