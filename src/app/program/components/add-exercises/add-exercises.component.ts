import { Component, OnDestroy } from '@angular/core';
import { ProgramService } from 'src/app/program/services/program.service';
import { Exercise } from 'src/app/exercises/models/exercise';

@Component({
  selector: 'pp-add-exercises',
  templateUrl: './add-exercises.component.html',
  styleUrls: ['./add-exercises.component.scss']
})
export class AddExercisesComponent implements OnDestroy {
  public exercisesToAdd: Exercise[] = [];
  public message: string;

  constructor(
    public program: ProgramService
  ) { }

  ngOnDestroy() {
    this.exercisesToAdd = [];
  }

  public add(): void {
    this.program.updateProgram(this.exercisesToAdd.concat(this.program.exercises.getValue()));
    this.exercisesToAdd = [];
    this.message = 'Added!';
    setTimeout(() => {
      this.message = undefined;
    }, 1000);
  }

  public addToAdding(exercise: Exercise) {
    this.exercisesToAdd.push(new Exercise(exercise));
  }

  public removeFromAdding(exercise: Exercise) {
    this.exercisesToAdd = this.exercisesToAdd.filter(x => x.id !== exercise.id);
  }
}
