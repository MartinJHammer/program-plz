import { Component, OnInit } from '@angular/core';
import { Program } from 'src/app/models/program';
import { Database } from 'src/app/database/database';
import { FullBodyProgram } from 'src/app/models/programs/full-body-program';

@Component({
  selector: 'program-plz-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {
  public program: Program;

  constructor(
    public database: Database
  ) { }

  ngOnInit() {
  }

  public getProgram() {
    const program = new FullBodyProgram({});
    program.createProgram(this.database);
    this.program = program;
  }
}
