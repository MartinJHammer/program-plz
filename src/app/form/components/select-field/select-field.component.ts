import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FieldBase } from '../field-base';
import { SelectField } from '../../models/select-field';
import { Entry } from 'src/app/start/models/entry';
import { DatabaseService } from 'src/app/start/services/database.service';


@Component({
  selector: 'pp-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss']
})
export class SelectFieldComponent extends FieldBase<SelectField> implements OnInit {

  public entries$: Observable<Entry[]>;

  constructor(
    private db: DatabaseService<Entry>
  ) { super(); }

  ngOnInit() {
    super.ngOnInit();
    this.entries$ = this.db.getAll(this.field.collection);
  }
}
