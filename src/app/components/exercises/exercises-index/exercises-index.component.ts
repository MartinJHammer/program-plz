import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/models/exercise';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'program-plz-exercises',
  templateUrl: './exercises-index.component.html',
  styleUrls: ['./exercises-index.component.scss']
})
export class ExercisesIndexComponent implements OnInit {

  public exercises: Observable<Exercise[]>;
  public currentExercise: Exercise;

  constructor(
    public db: DatabaseService,
    public service: ExerciseService
  ) { }

  ngOnInit() {
    this.exercises = this.service.getAll();
  }

  public setCurrentExercise(exercise: Exercise) {
    this.currentExercise = exercise;
  }

  public delete(exercise: Exercise) {
    this.db.delete(`exercises/${exercise.id}`);
  }
}
