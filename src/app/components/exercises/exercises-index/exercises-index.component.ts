import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/models/exercise';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'program-plz-exercises',
  templateUrl: './exercises-index.component.html',
  styleUrls: ['./exercises-index.component.scss']
})
export class ExercisesIndexComponent implements OnInit {

  public exercises: Observable<Exercise[]>;
  public currentExercise: Exercise;

  constructor(
    public db: DatabaseService<Exercise>,
    public service: ExerciseService
  ) { }

  ngOnInit() {
    this.exercises = this.service.get().pipe(map(ex => {
      return ex.sort((a, b) => (a.name > b.name) ? 1 : -1);
    }));
  }

  public nextPage() {
    // TODO: THIS IS BAD - TOO MANY REQUESTS ETC.
    // SEE https://angularfirebase.com/lessons/infinite-scroll-firestore-angular/ INSTEAD
    this.exercises = this.exercises.pipe(
      switchMap(values => {
        return this.service.get().pipe(map(newValues => values.concat(newValues)));
      })
    );
  }

  public setCurrentExercise(exercise: Exercise) {
    this.currentExercise = exercise;
  }

  public delete(exercise: Exercise) {
    this.db.delete(`exercises/${exercise.id}`);
  }
}
