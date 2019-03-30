import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/models/exercise';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'program-plz-exercises',
  templateUrl: './exercises-index.component.html',
  styleUrls: ['./exercises-index.component.scss']
})
export class ExercisesIndexComponent implements OnInit {

  public exercises: Observable<Exercise[]>;
  public currentExercise: Exercise;

  constructor(public db: DatabaseService) { }

  ngOnInit() {
    this.exercises = this.db.getAll<Exercise>('exercises');
  }

  public setCurrentExercise(exercise: Exercise) {
    this.currentExercise = exercise;
  }

  public delete(exercise: Exercise) {
    this.db.delete(`exercises/${exercise.id}`);
  }
}
