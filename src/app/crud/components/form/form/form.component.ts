import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Field } from 'src/app/models/field';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FieldTypes } from 'src/app/models/field-types';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import { Entry } from 'src/app/models/entry';

@Component({
  selector: 'pp-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() public fields: Field[];
  @Input() public area: string;
  public form: FormGroup;
  public types = FieldTypes;

  @Output() public submitted = new EventEmitter();

  constructor(
    public fb: FormBuilder,
    public db: DatabaseService<any>,
    public router: Router
  ) { }

  ngOnInit() {
    const fields = {};
    this.fields.forEach(field => {
      fields[field.key] = '';
    });

    this.form = this.fb.group(fields);
  }

  public onSubmit() {
    this.db.add(this.area, this.form.value);
    this.router.navigate([this.area]);
  }
}
