import { Component, OnInit } from '@angular/core';
import { ExerciseTypesFields } from '../../exercise-types-fields';
import { ExerciseTypesService } from '../../services/exercise-types.service';

@Component({
  selector: 'pp-exercise-types-create',
  templateUrl: './exercise-types-create.component.html',
  styleUrls: ['./exercise-types-create.component.scss']
})
export class ExerciseTypesCreateComponent implements OnInit {
  constructor(
    public fields: ExerciseTypesFields,
    public dataService: ExerciseTypesService
  ) { }
  ngOnInit() { }
}
