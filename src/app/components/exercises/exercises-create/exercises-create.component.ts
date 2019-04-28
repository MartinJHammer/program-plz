import { Component, OnInit } from '@angular/core';
import { ExerciseFields } from '../exercise-fields';

@Component({
  selector: 'pp-exercises-create',
  templateUrl: './exercises-create.component.html',
  styleUrls: ['./exercises-create.component.scss']
})
export class ExercisesCreateComponent implements OnInit {
  constructor(public fields: ExerciseFields) { }
  ngOnInit() { }
}
