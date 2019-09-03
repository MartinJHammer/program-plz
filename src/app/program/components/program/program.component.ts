import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../../services/program.service';
import { Exercise } from 'src/app/exercises/models/exercise';
import { Observable } from 'rxjs';

@Component({
  selector: 'pp-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {
  public programStepper: boolean;
  public exercises$: Observable<Exercise[]>;

  constructor(
    public program: ProgramService
  ) { }

  ngOnInit() {
    this.program.loadPreferences();
    this.exercises$ = this.program.exercises;
  }

  public toggleProgramStepper(): void {
    this.programStepper = !this.programStepper;
  }
}
