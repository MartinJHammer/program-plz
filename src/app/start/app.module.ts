import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { ExercisesIndexComponent } from './../components/exercises/exercises-index/exercises-index.component';
import { ProgramComponent } from './../components/program/program.component';
import { StartComponent } from './../components/start/start.component';
import { environment } from 'src/environments/environment';
import { ExercisesCreateComponent } from './../components/exercises/exercises-create/exercises-create.component';
import { ExercisesEditComponent } from './../components/exercises/exercises-edit/exercises-edit.component';
import { ManageComponent } from '../components/manage/manage.component';
import { ExerciseTypesIndexComponent } from '../components/exercise-types/exercise-types-index/exercise-types-index.component';
import { ExerciseTypesCreateComponent } from '../components/exercise-types/exercise-types-create/exercise-types-create.component';
import { ExerciseTypesEditComponent } from '../components/exercise-types/exercise-types-edit/exercise-types-edit.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { pipes } from '../pipes/pipes';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  declarations: [
    StartComponent,
    ProgramComponent,
    ManageComponent,
    NotFoundComponent,
    ExercisesIndexComponent,
    ExercisesCreateComponent,
    ExercisesEditComponent,
    ExerciseTypesIndexComponent,
    ExerciseTypesCreateComponent,
    ExerciseTypesEditComponent,
    ...pipes
  ],
  providers: [],
  bootstrap: [StartComponent]
})
export class AppModule { }
