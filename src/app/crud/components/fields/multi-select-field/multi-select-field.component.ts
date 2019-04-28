import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../../field-base/field-base.component';

@Component({
  selector: 'pp-multi-select-field',
  templateUrl: './multi-select-field.component.html',
  styleUrls: ['./multi-select-field.component.scss']
})
export class StringFieldComponent extends FieldBaseComponent implements OnInit {
  constructor() { super(); }

  ngOnInit() {
    super.ngOnInit();
  }

}
