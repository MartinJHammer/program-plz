import { Component, OnInit } from '@angular/core';
import { Field } from 'src/app/models/field';
import { FieldTypes } from 'src/app/models/field-types';

@Component({
  selector: 'pp-exercises-edit',
  templateUrl: './exercises-edit.component.html',
  styleUrls: ['./exercises-edit.component.scss']
})
export class ExercisesEditComponent implements OnInit {
  public fields: Field[] = [
    { key: 'id', type: FieldTypes.hidden },
    { key: 'name', type: FieldTypes.string },
    { key: 'exerciseTypes', value: [[]], type: FieldTypes.multiSelectField }
  ];

  constructor() { }
  ngOnInit() { }
}
