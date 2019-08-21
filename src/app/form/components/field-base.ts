import { OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SubscriptionHandler } from '../../start/helpers/subscription-handler';
import { Field } from '../models/field';
import { DataService } from 'src/app/start/services/data-service';

export class FieldBase<FieldType> implements OnInit, OnDestroy {

  @Input() public field: FieldType;
  @Input() public fields: Field[];
  @Input() public form: FormGroup;
  @Input() public dataService: DataService<any>;
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
