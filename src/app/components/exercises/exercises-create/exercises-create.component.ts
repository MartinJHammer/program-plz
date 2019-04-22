import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Exercise } from 'src/app/models/exercise';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { Field } from 'src/app/models/field';
import { FieldTypes } from 'src/app/models/field-types';

@Component({
  selector: 'pp-exercises-create',
  templateUrl: './exercises-create.component.html',
  styleUrls: ['./exercises-create.component.scss']
})
export class ExercisesCreateComponent implements OnInit {

  public fields: Field[] = [
    { key: 'name', placeholder: 'Enter exercise name', type: FieldTypes.string },
  ];

  constructor(
    public db: DatabaseService<Exercise>,
    public router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(exercise: Exercise) {
    this.db.add('exercises', exercise);
    this.router.navigate(['exercises']);
  }
}
