import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/models/exercise';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { ExerciseType } from 'src/app/models/exercise-type';
import { map, shareReplay, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'program-plz-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {

  public allExercises$: Observable<Exercise[]>;
  public exerciseTypes$: Observable<ExerciseType[]>;
  public currentExercise: Exercise;
  public exercises$: BehaviorSubject<Exercise[]>;

  constructor(
    public afs: AngularFirestore,
    public db: DatabaseService<any>
  ) { }

  ngOnInit() {
    this.allExercises$ = this.db.getAll('exercises').pipe(shareReplay(1));
    this.exerciseTypes$ = this.db.getAll('exercise-types').pipe(shareReplay(1));
  }

  public createProgram(): void {
    this.exercises$ = new BehaviorSubject<Exercise[]>([])
    combineLatest(
      this.allExercises$,
      this.exerciseTypes$
    ).pipe(
      map(values => {
        const exercises: Exercise[] = values[0];
        const exerciseTypes: ExerciseType[] = values[1];
        const vPull = exercises.filter(exercise => exercise.exerciseTypes.includes(exerciseTypes.find(et => et.name === 'Vertical pull').id));
        const vPush = exercises.filter(exercise => exercise.exerciseTypes.includes(exerciseTypes.find(et => et.name === 'Vertical push').id));
        const hPull = exercises.filter(exercise => exercise.exerciseTypes.includes(exerciseTypes.find(et => et.name === 'Horizontal pull').id));
        const hPush = exercises.filter(exercise => exercise.exerciseTypes.includes(exerciseTypes.find(et => et.name === 'Horizontal push').id));
        const legs = exercises.filter(exercise => [
          exerciseTypes.find(et => et.name === 'Squat').id,
          exerciseTypes.find(et => et.name === 'Lunge').id,
          exerciseTypes.find(et => et.name === 'Lift').id,
        ].some(condition => exercise.exerciseTypes.includes(condition)));
        const core = exercises.filter(exercise => exercise.exerciseTypes.includes(exerciseTypes.find(et => et.name === 'Core').id));

        this.exercises$.next([
          ...shuffle(vPull).slice(0, 1),
          ...shuffle(vPush).slice(0, 1),
          ...shuffle(hPull).slice(0, 1),
          ...shuffle(hPush).slice(0, 1),
          ...shuffle(legs).slice(0, 2),
          ...shuffle(core).slice(0, 2)
        ]);
      })
    ).subscribe();
  }

  public setCurrentExercise(exercise: Exercise) {
    this.currentExercise = exercise;
  }

  public trackById(index, item) {
    return item.id;
  }

  /**
   * Replaces an exercise in the program with another exercise.
   * Exercise is of same difficulty and targets same muscles (roughly)
   */
  public differentVersion(currentExercises: Exercise[], exercise: Exercise) {
    this.allExercises$.pipe(
      map(exercises => {
        exercises
          .filter(ex => exercise.exerciseTypes.some(condition => ex.exerciseTypes.includes(condition)))
          .filter(ex => ex.id !== exercise.id);
        const newExercise = shuffle(exercises).slice(0, 1)[0];
        currentExercises.forEach((ex, index) => {
          if (ex.id === exercise.id) {
            currentExercises[index] = newExercise;
          }
        });
        this.exercises$.next(currentExercises);
      }),
      take(1)
    ).subscribe();
  }

  /**
   * Replaces an exercise in the program with another exercise.
   * Exercise is of lower difficulty, but still targets the same muscles (roughly)
   */
  public easierVersion(exercise: Exercise) {

  }

  /**
   * Replaces an exercise in the program with another exercise.
   * Exercise is of higher difficulty, but still targets the same muscles (roughly)
   */
  public harderVersion(exercise: Exercise) {

  }
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// TODO: Replace with _.sample()
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}