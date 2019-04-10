import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Exercise } from 'src/app/models/exercise';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'pp-exercises-create',
  templateUrl: './exercises-create.component.html',
  styleUrls: ['./exercises-create.component.scss']
})
export class ExercisesCreateComponent implements OnInit {

  public form: FormGroup;

  constructor(
    public db: DatabaseService<Exercise>,
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
    this.db.add('exercises', exercise);
    this.router.navigate(['exercises']);
  }
}
