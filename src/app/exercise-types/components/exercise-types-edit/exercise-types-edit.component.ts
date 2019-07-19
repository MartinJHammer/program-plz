import { Component, OnInit } from '@angular/core';
import { ExerciseTypesFields } from '../../exercise-types-fields';

@Component({
  selector: 'pp-exercise-types-edit',
  templateUrl: './exercise-types-edit.component.html',
  styleUrls: ['./exercise-types-edit.component.scss']
})
export class ExerciseTypesEditComponent implements OnInit {

  constructor(public fields: ExerciseTypesFields) { }

  ngOnInit() { }
}
