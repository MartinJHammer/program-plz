import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../../services/program.service';
import { take } from 'rxjs/operators';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

@Component({
  selector: 'pp-program-stepper',
  templateUrl: './program-stepper.component.html',
  styleUrls: ['./program-stepper.component.scss']
})
export class ProgramStepperComponent implements OnInit {

  constructor(
    public program: ProgramService
  ) { }

  ngOnInit() {
  }

  public currentStep(currentStep: StepperSelectionEvent) {
    if (currentStep.selectedIndex === 2 && !this.program.programCreated) {
      this.program.plz();
    }
  }
}
