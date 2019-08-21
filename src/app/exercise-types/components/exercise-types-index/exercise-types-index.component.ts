import { Component } from '@angular/core';
import { ExerciseTypesService } from '../../services/exercise-types.service';

@Component({
  selector: 'pp-exercise-types',
  templateUrl: './exercise-types-index.component.html',
  styleUrls: ['./exercise-types-index.component.scss']
})
export class ExerciseTypesIndexComponent {
  constructor(
    public dataService: ExerciseTypesService
  ) { }
}
