import { Component, OnInit } from '@angular/core';
import { FieldBase } from '../field-base';
import { Field } from '../../models/field';

@Component({
  selector: 'pp-editor-field',
  templateUrl: './editor-field.component.html',
  styleUrls: ['./editor-field.component.scss']
})
export class EditorFieldComponent extends FieldBase<Field> implements OnInit {

  public data: string;
  public showEditor: boolean;

  constructor() { super(); }

  ngOnInit() {
    super.ngOnInit();
    this.data = this.getFieldValue(this.field.key);
  }

  public onChange(data: string) {
    this.setFieldValue(data);
  }

  public toggleEditor() {
    this.showEditor = !this.showEditor;
  }
}
