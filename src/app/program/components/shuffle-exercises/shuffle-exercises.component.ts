import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../../services/program.service';

@Component({
  selector: 'pp-shuffle-exercises',
  templateUrl: './shuffle-exercises.component.html',
  styleUrls: ['./shuffle-exercises.component.scss']
})
export class ShuffleExercisesComponent implements OnInit {

  constructor(
    public program: ProgramService
  ) { }

  ngOnInit() {
  }

  public shuffleExercises(): void {
    this.program.shuffleExercises();
  }
}
