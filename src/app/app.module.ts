import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { FrontPageComponent } from './components/front-page/front-page.component';
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
    FrontPageComponent,
    ExercisesComponent,
    ProgramComponent,
    StartComponent
  ],
  providers: [],
  bootstrap: [StartComponent]
})
export class AppModule { }
