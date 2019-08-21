import { Component } from '@angular/core';
import { ExercisesService } from '../../services/exercises.service';

@Component({
  selector: 'pp-exercises-index',
  templateUrl: './exercises-index.component.html',
  styleUrls: ['./exercises-index.component.scss']
})
export class ExercisesIndexComponent {
  constructor(
    public dataService: ExercisesService
  ) { }
}
