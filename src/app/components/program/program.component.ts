import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/models/exercise';
import { Observable, BehaviorSubject, combineLatest, merge, empty, of } from 'rxjs';
import { ExerciseType } from 'src/app/models/exercise-type';
import { map, shareReplay, take, tap, switchMap, scan, filter, expand } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'program-plz-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {

  public allExerciseTypes$: Observable<ExerciseType[]>;
  public currentExercise: Exercise;
  public exercises$ = new BehaviorSubject<Exercise[]>([]);
  public selectedExerciseTypes$ = new BehaviorSubject<ExerciseType[]>([]);

  constructor(
    public afs: AngularFirestore,
    public db: DatabaseService<any>
  ) { }

  ngOnInit() {
    this.allExerciseTypes$ = this.db.getAll('exercise-types').pipe(shareReplay(1));
    const setInitialExerciseTypes = this.allExerciseTypes$.pipe(map(exerciseTypes => this.selectedExerciseTypes$.next(exerciseTypes)), take(1));
    setInitialExerciseTypes.subscribe();
  }

  public createProgram(): void {
    this.selectedExerciseTypes$.pipe(
      switchMap(exerciseTypes => {
        return combineLatest(exerciseTypes.map(exerciseType => this.getRandom(exerciseType.id)));
      }),
      map(exercises => this.exercises$.next(exercises.reduce((a, b) => a.concat(b), []))),
      take(1)
    ).subscribe();
  }

  public getRandom(id: string): Observable<any[]> {
    const randomId = this.afs.createId();
    const random$ = this.afs.collection('exercises', ref => ref.where('id', '>=', randomId).where('exerciseTypes', 'array-contains', id).orderBy('id').limit(1)).get().pipe(
      map(docs => {
        return docs.docs.map(e => {
          return {
            id: e.id,
            ...e.data()
          } as any;
        });
      })
    );

    // START HERE: HOW TO MAKE THE REQUEST RECURSIVE UNTIL VALUE IS RETRIEVED???
    // const retryRequest$ = random$.pipe(
    //   expand(values => (values === undefined && values[0] === undefined) ? random$ : empty()),
    //   tap(x => console.log(x)),
    //   tap(() => randomId = this.afs.createId())
    // ).subscribe();

    // return of([]);

    const retry$ = random$.pipe(
      filter(x => x === undefined || x[0] === undefined),
    );

    const randomRetrieved$ = random$.pipe(filter(x => x !== undefined && x[0] !== undefined));
    return merge(randomRetrieved$, retry$).pipe(tap(x => console.log('RESULT', x, x.length)));
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
    // this.allExercises$.pipe(
    //   map(exercises => {
    //     exercises
    //       .filter(ex => exercise.exerciseTypes.some(condition => ex.exerciseTypes.includes(condition)))
    //       .filter(ex => ex.id !== exercise.id);
    //     const newExercise = shuffle(exercises).slice(0, 1)[0];
    //     currentExercises.forEach((ex, index) => {
    //       if (ex.id === exercise.id) {
    //         currentExercises[index] = newExercise;
    //       }
    //     });
    //     this.exercises$.next(currentExercises);
    //   }),
    //   take(1)
    // ).subscribe();
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

// Kept for reference if I have to do offline shuffles. P.T. not used since I shuffle on db level.
// exerciseTypes.forEach(et => {
//   const found = exercises.filter(exercise => exercise.exerciseTypes.includes(et.id));
//   if (found) {
//     allExercises = allExercises.concat(shuffle(found).slice(0, 1));
//   }
// });