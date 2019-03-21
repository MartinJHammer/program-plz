import { Component, OnInit } from '@angular/core';
import { Program } from 'src/app/models/program';
import { FormGroup, FormControl } from '@angular/forms';
import { Database } from 'src/app/database/database';
import { FullBodyProgram } from 'src/app/models/programs/full-body-program';

@Component({
  selector: 'sequencer-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {
  public program: Program;

  public requirements = new FormGroup({
    duration: new FormControl(0),
    timeBudget: new FormControl(0)
  });

  constructor(
    public database: Database
  ) { }

  ngOnInit() {
  }

  public getProgram() {
    this.program = this.createProgram();
  }

  public createProgram(): Program {
    const program = new FullBodyProgram({});
    program.createProgram(this.database);

    return program;
  }

}
