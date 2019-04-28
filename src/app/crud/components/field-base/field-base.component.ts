import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SubscriptionHandler } from 'src/app/helpers/subscription-handler';

@Component({
  selector: 'pp-field-base',
  templateUrl: './field-base.component.html',
  styleUrls: ['./field-base.component.scss']
})
export class FieldBaseComponent<FieldType> implements OnInit, OnDestroy {

  @Input() public field: FieldType;
  @Input() public form: FormGroup;
  public subscriptionHandler = new SubscriptionHandler();

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

}
