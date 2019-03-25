import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { ExerciseIndexComponent } from './components/exercises-index/exercises-index.component';
import { ProgramComponent } from './components/program/program.component';
import { StartComponent } from './components/start/start.component';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  declarations: [
    ExerciseIndexComponent,
    ProgramComponent,
    StartComponent
  ],
  providers: [],
  bootstrap: [StartComponent]
})
export class AppModule { }
