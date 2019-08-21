import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { map, filter, switchMap, tap, take } from 'rxjs/operators';
import { merge, Observable } from 'rxjs';
import { Field } from '../../models/field';
import { getRandomNumber } from 'src/app/start/helpers/random-number';
import { DataService } from 'src/app/start/services/data-service';

@Component({
  selector: 'pp-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() public fields: Field[];
  @Input() public dataService: DataService<any>;
  public collection: string;
  public form$: Observable<FormGroup>;

  @Output() public submitted = new EventEmitter();

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.collection = this.dataService.collection;
    const id$ = this.activatedRoute.params.pipe(map(params => params.id));

    const create$ = id$.pipe(
      filter(id => !id),
      map(() => this.fields = this.fields.filter(field => field.key !== 'id')),
      map(() => this.fields.reduce((fields, field) => {
        fields[field.key] = field.value;
        return fields;
      }, {})),
    );

    const edit$ = id$.pipe(
      filter(id => id),
      switchMap(id => this.dataService.getSingle(id).pipe(take(1))),
      map(entry => this.fields.reduce((fields, field) => {
        fields[field.key] = Array.isArray(entry[field.key]) ? [entry[field.key]] : entry[field.key];
        return fields;
      }, {}))
    );

    this.form$ = merge(create$, edit$).pipe(map(correctFields => this.fb.group(correctFields)));
  }

  public onSubmit(form: FormGroup) {
    if (form.value.id) {
      this.dataService.update(form.value);
    } else {
      const values = form.value;
      values.random = getRandomNumber();
      this.dataService.add(form.value);
    }

    this.router.navigate([this.collection]);
  }
}
