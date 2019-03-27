import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Exercise } from 'src/app/models/exercise';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'pp-exercises-create',
  templateUrl: './exercises-create.component.html',
  styleUrls: ['./exercises-create.component.scss']
})
export class ExercisesCreateComponent implements OnInit {

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
    this.db.collection<Exercise>('exercises').add(exercise).then(() => {
      this.router.navigate(['exercises']);
    });
  }

}
