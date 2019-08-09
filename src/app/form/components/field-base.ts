import { OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SubscriptionHandler } from '../../start/helpers/subscription-handler';
import { Field } from '../models/field';

export class FieldBase<FieldType> implements OnInit, OnDestroy {

  @Input() public field: FieldType;
  @Input() public form: FormGroup;
  public subscriptionHandler = new SubscriptionHandler();

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  protected setFieldValue(data: any): void {
    (this.form.controls[((this.field as unknown) as Field).key] as FormControl).setValue(data);
  }

  protected getFieldValue(key: string): any {
    return (this.form.controls[((this.field as unknown) as Field).key] as FormControl).value;
  }
}
