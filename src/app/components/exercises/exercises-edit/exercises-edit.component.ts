import { Component, OnInit } from '@angular/core';
import { ExerciseFields } from '../exercise-fields';

@Component({
  selector: 'pp-exercises-edit',
  templateUrl: './exercises-edit.component.html',
  styleUrls: ['./exercises-edit.component.scss']
})
export class ExercisesEditComponent implements OnInit {
  constructor(public fields: ExerciseFields) { }
  ngOnInit() { }
}
