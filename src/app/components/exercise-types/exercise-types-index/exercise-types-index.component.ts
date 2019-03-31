import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/models/exercise';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
import { ExerciseType } from 'src/app/models/exercise-type';
import { ExerciseTypeService } from 'src/app/services/exercise-type.service';

@Component({
  selector: 'pp-exercise-types',
  templateUrl: './exercise-types-index.component.html',
  styleUrls: ['./exercise-types-index.component.scss']
})
export class ExerciseTypesIndexComponent implements OnInit {

  public exerciseTypes: Observable<ExerciseType[]>;

  constructor(public db: DatabaseService, public service: ExerciseTypeService) { }

  ngOnInit() {
    this.exerciseTypes = this.service.getAll();
  }

  public delete(exercise: Exercise) {
    this.db.delete(`exercise-types/${exercise.id}`);
  }
}
