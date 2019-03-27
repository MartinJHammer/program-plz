import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Exercise } from 'src/app/models/exercise';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'pp-exercise-types-create',
  templateUrl: './exercise-types-create.component.html',
  styleUrls: ['./exercise-types-create.component.scss']
})
export class ExerciseTypesCreateComponent implements OnInit {

  public form: FormGroup;

  constructor(
    public db: AngularFirestore,
    public fb: FormBuilder,
    public router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ''
    });
  }

  onSubmit() {
    const exercise: Exercise = this.form.value;
    this.db.collection<Exercise>('exercise-types').add(exercise).then(() => {
      this.router.navigate(['exercise-types']);
    });
  }

}
