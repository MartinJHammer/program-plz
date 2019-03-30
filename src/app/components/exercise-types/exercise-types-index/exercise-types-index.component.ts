import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/models/exercise';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database.service';
import { ExerciseType } from 'src/app/models/exercise-type';

@Component({
  selector: 'pp-exercise-types',
  templateUrl: './exercise-types-index.component.html',
  styleUrls: ['./exercise-types-index.component.scss']
})
export class ExerciseTypesIndexComponent implements OnInit {

  public exerciseTypes: Observable<ExerciseType[]>;

  constructor(public db: DatabaseService) { }

  ngOnInit() {
    this.exerciseTypes = this.db.getAll<ExerciseType>('exercise-types');
  }

  public delete(exercise: Exercise) {
    this.db.delete(`exercise-types/${exercise.id}`);
  }
}
