import { Component, OnInit } from '@angular/core';
import { ExercisesFields } from '../../exercises-fields';
import { ExercisesService } from '../../services/exercises.service';

@Component({
  selector: 'pp-exercises-create',
  templateUrl: './exercises-create.component.html',
  styleUrls: ['./exercises-create.component.scss']
})
export class ExercisesCreateComponent implements OnInit {
  constructor(
    public fields: ExercisesFields,
    public dataService: ExercisesService
  ) { }
  ngOnInit() { }
}
