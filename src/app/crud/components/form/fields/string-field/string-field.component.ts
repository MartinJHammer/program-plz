import { Component, OnInit, Input } from '@angular/core';
import { Field } from 'src/app/models/field';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'pp-string-field',
  templateUrl: './string-field.component.html',
  styleUrls: ['./string-field.component.scss']
})
export class StringFieldComponent implements OnInit {

  @Input() public field: Field;
  @Input() public form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
