import { Component, OnInit } from '@angular/core';
import { ProgramComponent } from '../program/program.component';

@Component({
  selector: 'pp-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {

  constructor(
    public program: ProgramComponent
  ) { }

  ngOnInit() {
  }

}
