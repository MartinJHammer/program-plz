import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Field } from 'src/app/models/field';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FieldTypes } from 'src/app/models/field-types';

@Component({
  selector: 'pp-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() public fields: Field[];
  public form: FormGroup;
  public types = FieldTypes;

  @Output() public submitted = new EventEmitter();

  constructor(public fb: FormBuilder, ) { }

  ngOnInit() {
    const fields = {};
    this.fields.forEach(field => {
      fields[field.key] = '';
    });

    this.form = this.fb.group(fields);
  }

  public onSubmit() {
    this.submitted.next(this.form.value);
  }
}
