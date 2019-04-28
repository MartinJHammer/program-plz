import { Component, OnInit } from '@angular/core';
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
    { key: 'exerciseTypes', value: [[]], type: FieldTypes.multiSelectField }
  ];

  constructor() { }

  ngOnInit() { }
}
