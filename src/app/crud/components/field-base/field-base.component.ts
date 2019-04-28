import { Component, OnInit, Input } from '@angular/core';
import { Field } from 'src/app/models/field';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'pp-field-base',
  templateUrl: './field-base.component.html',
  styleUrls: ['./field-base.component.scss']
})
export class FieldBaseComponent implements OnInit {

  @Input() public field: Field;
  @Input() public form: FormGroup;


  constructor() { }

  ngOnInit() {
  }

}
