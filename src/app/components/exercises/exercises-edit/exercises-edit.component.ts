import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { Exercise } from 'src/app/models/exercise';
import { map, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'pp-exercises-edit',
  templateUrl: './exercises-edit.component.html',
  styleUrls: ['./exercises-edit.component.scss']
})
export class ExercisesEditComponent implements OnInit {

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
      switchMap(id => this.db.doc<Exercise>(`exercises/${id}`).get()),
      map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Exercise)),
      map(exercise => this.form = this.fb.group({
        id: exercise.id,
        name: exercise.name
      })),
      take(1)
    ).subscribe();
  }

  onSubmit() {
    const exercise: Exercise = this.form.value;
    this.db.doc(`exercises/${exercise.id}`).update(exercise);
    this.router.navigate(['exercises']);
  }
}
