import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramRoutingModule } from './program.routing.module';
import { components, entryComponents } from './components/components';
import { UiModule } from '../ui/ui.module';
import { ExercisesModule } from '../exercises/exercises.module';
import { SearchModule } from '../search/search.module';

@NgModule({
  imports: [
    CommonModule,
    ProgramRoutingModule,
    ExercisesModule,
    UiModule,
    SearchModule
  ],
  declarations: [
    ...components
  ],
  entryComponents: [
    ...entryComponents
  ],
  exports: [
    ...components
  ]
})
export class ProgramModule { }
