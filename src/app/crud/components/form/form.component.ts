import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Field } from 'src/app/models/field';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FieldTypes } from 'src/app/models/field-types';
import { DatabaseService } from 'src/app/services/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, filter, switchMap, tap } from 'rxjs/operators';
import { merge, Observable } from 'rxjs';

@Component({
  selector: 'pp-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() public fields: Field[];
  @Input() public area: string;
  public form$: Observable<FormGroup>;
  public types = FieldTypes;

  @Output() public submitted = new EventEmitter();

  constructor(
    public fb: FormBuilder,
    public db: DatabaseService<any>,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const id$ = this.activatedRoute.params.pipe(map(params => params.id));

    const create$ = id$.pipe(
      filter(id => !id),
      map(() => this.fields.reduce((fields, field) => {
        fields[field.key] = field.value;
        return fields;
      }, {}))
    );

    const edit$ = id$.pipe(
      filter(id => id),
      switchMap(id => this.db.getSingle(this.area, id)),
      map(entry => this.fields.reduce((fields, field) => {
        fields[field.key] = Array.isArray(entry[field.key]) ? [entry[field.key]] : entry[field.key];
        return fields;
      }, {}))
    );

    this.form$ = merge(create$, edit$).pipe(map(correctFields => this.fb.group(correctFields)));
  }

  public onSubmit(form: FormGroup) {
    if (form.value.id) {
      this.db.update(`${this.area}/${form.value.id}`, form.value);
    } else {
      this.db.add(this.area, form.value);
    }

    this.router.navigate([this.area]);
  }
}
