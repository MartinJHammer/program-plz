import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { Exercise } from 'src/app/models/exercise';
import { map, switchMap, take } from 'rxjs/operators';
import { ExerciseType } from 'src/app/models/exercise-type';
import { Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'pp-exercises-edit',
  templateUrl: './exercises-edit.component.html',
  styleUrls: ['./exercises-edit.component.scss']
})
export class ExercisesEditComponent implements OnInit {

  public form: FormGroup;
  public exercise$: Observable<Exercise>;
  public exerciseTypes$: Observable<ExerciseType[]>;
  public exerciseTypes: ExerciseType[];

  constructor(
    public db: AngularFirestore,
    public fb: FormBuilder,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // Get selected exercise
    this.exercise$ = this.activatedRoute.params.pipe(
      map(params => params['id']),
      switchMap(id => this.db.doc<Exercise>(`exercises/${id}`).get()),
      map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Exercise))
    );

    // Get all exercise types
    this.exerciseTypes$ = this.db.collection<ExerciseType>('exercise-types').snapshotChanges().pipe(
      map(docs => docs.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as ExerciseType;
      }))
    );

    // Create form
    combineLatest(
      this.exercise$,
      this.exerciseTypes$
    ).pipe(
      map(values => {
        const [exercise, exerciseTypes] = values;
        this.exerciseType = exerciseTypes;

        this.form = this.fb.group({
          id: exercise.id,
          name: exercise.name,
          exerciseTypes: new FormArray(exerciseTypes.map((exerciseType) => {
            const selected = exercise.exerciseTypes ? exercise.exerciseTypes.some(et => et === exerciseType.id) : false;
            return new FormControl(selected);
          }))
        });
      })
    ).subscribe();
  }

  public buildExerciseTypes(exercise: Exercise, exerciseTypes: ExerciseType[]) {
    return this.fb.array(exerciseTypes.map(exerciseType => {
      const selected = exercise.exerciseTypes ? exercise.exerciseTypes.find(et => et === exerciseType.id) : undefined;
      return this.fb.control(selected ? true : false);
    }));
  }

  public onSubmit() {
    const exercise: Exercise = this.form.value;
    this.db.doc(`exercises/${exercise.id}`).update(exercise);
    this.router.navigate(['exercises']);
  }

}
