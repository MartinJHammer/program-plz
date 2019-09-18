import { NgModule } from '@angular/core';
import { pipes } from './pipes/pipes';

@NgModule({
  imports: [],
  declarations: [
    ...pipes
  ],
  exports: [
    ...pipes
  ]
})
export class UtilitiesModule { }
