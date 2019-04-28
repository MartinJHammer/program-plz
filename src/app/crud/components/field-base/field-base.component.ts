import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Field } from 'src/app/models/field';
import { FormGroup } from '@angular/forms';
import { SubscriptionHandler } from 'src/app/helpers/subscription-handler';

@Component({
  selector: 'pp-field-base',
  templateUrl: './field-base.component.html',
  styleUrls: ['./field-base.component.scss']
})
export class FieldBaseComponent implements OnInit, OnDestroy {

  @Input() public field: Field;
  @Input() public form: FormGroup;
  public subscriptionHandler = new SubscriptionHandler();


  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

}
