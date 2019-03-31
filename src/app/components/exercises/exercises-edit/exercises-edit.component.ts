import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Exercise } from 'src/app/models/exercise';
import { map } from 'rxjs/operators';
import { ExerciseType } from 'src/app/models/exercise-type';
import { Observable } from 'rxjs';
import { SubscriptionHandler } from 'src/app/helpers/subscription-handler';
import { DatabaseService } from 'src/app/services/database.service';
import { ExerciseService } from 'src/app/services/exercise.service';

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
    public db: DatabaseService,
    public exerciseTypeService: ExerciseService,
    public fb: FormBuilder,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.exercise$ = this.db.getSingleByParams('exercises', this.activatedRoute);
    this.exerciseTypes$ = this.exerciseTypeService.getAll();

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
    this.db.update<Exercise>(`exercises/${exercise.id}`, exercise);
    this.router.navigate(['exercises']);
  }
}
