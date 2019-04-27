import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { map, take, switchMap } from 'rxjs/operators';
import { ExerciseType } from 'src/app/models/exercise-type';
import { DatabaseService } from 'src/app/services/database.service';
import { Field } from 'src/app/models/field';
import { FieldTypes } from 'src/app/models/field-types';

@Component({
  selector: 'pp-exercise-types-edit',
  templateUrl: './exercise-types-edit.component.html',
  styleUrls: ['./exercise-types-edit.component.scss']
})
export class ExerciseTypesEditComponent implements OnInit {

  public fields: Field[] = [
    { key: 'id', type: FieldTypes.hidden },
    { key: 'name', placeholder: 'Enter type name', type: FieldTypes.string },
  ];

  constructor() { }

  ngOnInit() { }
}
