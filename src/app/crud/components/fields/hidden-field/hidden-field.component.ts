import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../../field-base/field-base.component';
import { Field } from 'src/app/models/field';

@Component({
  selector: 'pp-hidden-field',
  templateUrl: './hidden-field.component.html',
  styleUrls: ['./hidden-field.component.scss']
})
export class HiddenFieldComponent extends FieldBaseComponent<Field> implements OnInit {

  constructor() { super(); }

  ngOnInit() {
    super.ngOnInit();
  }

}
