import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { Exercise } from 'src/app/models/exercise';
import { map, switchMap, take } from 'rxjs/operators';
import { ExerciseType } from 'src/app/models/exercise-type';

@Component({
  selector: 'pp-exercise-types-edit',
  templateUrl: './exercise-types-edit.component.html',
  styleUrls: ['./exercise-types-edit.component.scss']
})
export class ExerciseTypesEditComponent implements OnInit {

  public form: FormGroup;

  constructor(
    public db: AngularFirestore,
    public fb: FormBuilder,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.pipe(
      map(params => params['id']),
      switchMap(id => this.db.doc<ExerciseType>(`exercise-types/${id}`).get()),
      map(doc => ({
        id: doc.id,
        ...doc.data()
      } as ExerciseType)),
      map(exercise => this.form = this.fb.group({
        id: exercise.id,
        name: exercise.name
      })),
      take(1)
    ).subscribe();
  }

  onSubmit() {
    const exercise: Exercise = this.form.value;
    this.db.doc(`exercise-types/${exercise.id}`).update(exercise);
    this.router.navigate(['exercise-types']);
  }
}
