import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { map, take, switchMap } from 'rxjs/operators';
import { ExerciseType } from 'src/app/models/exercise-type';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'pp-exercise-types-edit',
  templateUrl: './exercise-types-edit.component.html',
  styleUrls: ['./exercise-types-edit.component.scss']
})
export class ExerciseTypesEditComponent implements OnInit {

  public form: FormGroup;

  constructor(
    public db: DatabaseService,
    public fb: FormBuilder,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.pipe(switchMap(params => this.db.getSingle<ExerciseType>('exercise-types', params.id))).pipe(
      map(exerciseType => this.form = this.fb.group({
        id: exerciseType.id,
        name: exerciseType.name
      })),
      take(1)
    ).subscribe();
  }

  onSubmit() {
    const exerciseType: ExerciseType = this.form.value;
    this.db.update<ExerciseType>(`exercise-types/${exerciseType.id}`, exerciseType);
    this.router.navigate(['exercise-types']);
  }
}
