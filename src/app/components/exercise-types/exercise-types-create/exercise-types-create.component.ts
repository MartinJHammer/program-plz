import { Component, OnInit } from '@angular/core';
import { Field } from 'src/app/models/field';
import { FieldTypes } from 'src/app/models/field-types';

@Component({
  selector: 'pp-exercise-types-create',
  templateUrl: './exercise-types-create.component.html',
  styleUrls: ['./exercise-types-create.component.scss']
})
export class ExerciseTypesCreateComponent implements OnInit {

  public fields: Field[] = [
    { key: 'name', placeholder: 'Enter type name', type: FieldTypes.string },
  ];

  constructor() { }

  ngOnInit() { }
}
