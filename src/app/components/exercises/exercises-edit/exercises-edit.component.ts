import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { Exercise } from 'src/app/models/exercise';
import { map, switchMap } from 'rxjs/operators';
import { ExerciseType } from 'src/app/models/exercise-type';
import { Observable } from 'rxjs';
import { SubscriptionHandler } from 'src/app/helpers/subscription-handler';

@Component({
  selector: 'pp-exercises-edit',
  templateUrl: './exercises-edit.component.html',
  styleUrls: ['./exercises-edit.component.scss']
})
export class ExercisesEditComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public exercise$: Observable<Exercise>;
  public exerciseTypes$: Observable<ExerciseType[]>;

  public subHandler = new SubscriptionHandler();

  constructor(
    public db: AngularFirestore,
    public fb: FormBuilder,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // Get selected exercise
    this.exercise$ = this.activatedRoute.params.pipe(
      map(params => params.id),
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
    this.subHandler.register(this.exercise$.pipe(
      map(exercise => {
        this.form = this.fb.group({
          id: exercise.id,
          name: exercise.name,
          exerciseTypes: exercise.exerciseTypes ? [exercise.exerciseTypes] : [[]]
        });
      })
    ).subscribe());
  }

  ngOnDestroy() {
    this.subHandler.unsubscribe();
  }

  public setCheckboxValue(checkboxField) {
    const checkbox = checkboxField.target;
    const control = this.form.get('exerciseTypes');
    control.setValue(checkbox.checked ? [...control.value, checkbox.value] : control.value.filter(id => checkbox.value !== id));
  }

  public onSubmit() {
    const exercise = this.form.value as Exercise;
    this.db.doc(`exercises/${exercise.id}`).update(exercise);
    this.router.navigate(['exercises']);
  }
}
