import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Database } from 'src/app/database/database';
import { ExerciseTable } from 'src/app/database/tables/exercise-table';
import { Exercise } from 'src/app/models/exercise';

@Component({
  selector: 'program-plz-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {

  public exercises: ExerciseTable;

  public form = new FormGroup({
    name: new FormControl('')
  });

  public editForm: FormGroup;

  constructor(public database: Database) { }

  ngOnInit() {
    this.exercises = this.database.exercises;
  }

  public onSubmit() {
    this.exercises.add(this.form.value);
    this.form.reset();
  }

  public onEditSubmit() {
    this.exercises.update(this.editForm.value);
    this.editForm = undefined;
  }

  public edit(exercise: Exercise) {
    this.editForm = new FormGroup({
      id: new FormControl(exercise.id),
      name: new FormControl(exercise.name)
    });
  }

  public reset() {
    if (prompt(`Write 'yes' to reset`) === 'yes') {
      this.exercises.purge();
      this.exercises.seed();
    }
  }
}
