import { Component, OnInit } from '@angular/core';
import { FieldBase } from '../../field-base';
import { Field } from 'src/app/models/field';

@Component({
  selector: 'pp-hidden-field',
  templateUrl: './hidden-field.component.html',
  styleUrls: ['./hidden-field.component.scss']
})
export class HiddenFieldComponent extends FieldBase<Field> implements OnInit {

  constructor() { super(); }

  ngOnInit() {
    super.ngOnInit();
  }

}
