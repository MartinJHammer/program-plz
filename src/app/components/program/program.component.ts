import { Component, OnInit } from '@angular/core';
import { Program } from 'src/app/models/program';
import { Exercise } from 'src/app/models/exercise';

@Component({
  selector: 'program-plz-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {

  public currentExercise: Exercise;

  constructor(
    public program: Program
  ) { }

  ngOnInit() {
  }

  public getProgram() {
    this.program.createProgram();
  }

  public differentVersion(exercise?: Exercise) {
    exercise ? this.program.differentVersion(exercise) : this.program.differentVersion(this.currentExercise);
  }

  public setCurrentExercise(exercise: Exercise) {
    this.currentExercise = exercise;
  }

  public trackById(index, item) {
    return item.id;
  }
}
