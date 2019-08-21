import { Component, OnInit } from '@angular/core';
import { ExercisesFields } from '../../exercises-fields';
import { ExercisesService } from '../../services/exercises.service';

@Component({
  selector: 'pp-exercises-edit',
  templateUrl: './exercises-edit.component.html',
  styleUrls: ['./exercises-edit.component.scss']
})
export class ExercisesEditComponent implements OnInit {
  constructor(
    public fields: ExercisesFields,
    public dataService: ExercisesService
  ) { }
  ngOnInit() { }
}
