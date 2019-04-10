import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { ExerciseType } from 'src/app/models/exercise-type';

@Component({
  selector: 'pp-exercise-types-create',
  templateUrl: './exercise-types-create.component.html',
  styleUrls: ['./exercise-types-create.component.scss']
})
export class ExerciseTypesCreateComponent implements OnInit {

  public form: FormGroup;

  constructor(
    public db: DatabaseService<ExerciseType>,
    public fb: FormBuilder,
    public router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ''
    });
  }

  onSubmit() {
    const exerciseType: ExerciseType = this.form.value;
    this.db.add('exercise-types', exerciseType);
    this.router.navigate(['exercise-types']);
  }
}
