import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { ProgramComponent } from './components/program/program.component';
import { StartComponent } from './components/start/start.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    ExercisesComponent,
    ProgramComponent,
    StartComponent
  ],
  providers: [],
  bootstrap: [StartComponent]
})
export class AppModule { }
