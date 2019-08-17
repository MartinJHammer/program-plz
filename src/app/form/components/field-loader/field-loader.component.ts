import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Field } from '../../models/field';
import { DynamicFormFieldDirective } from '../dynamic-form-field-directive';
import { FieldBase } from '../field-base';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'pp-field-loader',
  templateUrl: './field-loader.component.html',
  styleUrls: ['./field-loader.component.scss']
})
export class FieldLoaderComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() field: Field;
  @Input() fields: Field[];

  @ViewChild(DynamicFormFieldDirective) dynamicFormField: DynamicFormFieldDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.field.component);

    const viewContainerRef = this.dynamicFormField.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as FieldBase<any>).field = this.field;
    (componentRef.instance as FieldBase<any>).form = this.form;
  }
}
