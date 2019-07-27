import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../../services/program.service';

@Component({
  selector: 'pp-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {
  public programStepper: boolean;

  constructor(
    public program: ProgramService
  ) { }

  ngOnInit() {
    this.program.loadPreferences();
  }

  public toggleProgramStepper(): void {
    this.programStepper = !this.programStepper;
  }
}
