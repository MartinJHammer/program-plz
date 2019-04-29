import { Component, OnInit } from '@angular/core';
import { Program } from 'src/app/models/program';
import { Exercise } from 'src/app/models/exercise';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'program-plz-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {

  public currentExercise: Exercise;
  public exercises$: BehaviorSubject<Exercise[]>;

  constructor(
    public program: Program
  ) { }

  ngOnInit() {
  }

  public getProgram() {
    this.exercises$ = this.program.createProgram();
  }

  public differentVersion(currentExercises: Exercise[], exercise: Exercise) {
    this.program.differentVersion(this.exercises$, currentExercises, exercise);
  }

  public setCurrentExercise(exercise: Exercise) {
    this.currentExercise = exercise;
  }

  public trackById(index, item) {
    return item.id;
  }
}
