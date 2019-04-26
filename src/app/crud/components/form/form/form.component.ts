import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Field } from 'src/app/models/field';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FieldTypes } from 'src/app/models/field-types';
import { DatabaseService } from 'src/app/services/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Entry } from 'src/app/models/entry';
import { map, filter, switchMap, take } from 'rxjs/operators';
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
    const fields = {};

    const id$ = this.activatedRoute.params.pipe(map(params => params.id));

    const create$ = id$.pipe(
      filter(id => !id),
      map(() => this.fields.map(field => {
        fields[field.key] = '';
      }))
    );

    // START HERE - GO TO EXERCISE TYPES EDIT -> YOU'LL GET AN ERROR -> YOU'RE WECLOME
    const edit$ = id$.pipe(
      filter(id => id),
      switchMap(id => this.db.getSingle(this.area, id)),
      map(entry => this.fields.map(field => {
        fields[field.key] = entry[field.key];
      }))
    );

    this.form$ = merge(create$, edit$).pipe(map(correctFields => this.fb.group(correctFields)));
  }

  public onSubmit() {
    // EDIT OR DELETE?!?! o_O
    // this.form$.pipe(
    //   map(form => this.db.add(this.area, form.value)),
    //   map(() => this.router.navigate([this.area])),
    //   take(1)
    // ).subscribe();
  }
}
