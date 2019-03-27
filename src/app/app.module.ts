import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { ExercisesIndexComponent } from './components/exercises/exercises-index/exercises-index.component';
import { ProgramComponent } from './components/program/program.component';
import { StartComponent } from './components/start/start.component';
import { environment } from 'src/environments/environment';
import { ExercisesCreateComponent } from './components/exercises/exercises-create/exercises-create.component';
import { ExercisesEditComponent } from './components/exercises/exercises-edit/exercises-edit.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  declarations: [
    ExercisesIndexComponent,
    ProgramComponent,
    StartComponent,
    ExercisesCreateComponent,
    ExercisesEditComponent
  ],
  providers: [],
  bootstrap: [StartComponent]
})
export class AppModule { }
