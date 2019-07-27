import { Component, OnInit } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { ProgramService } from '../../services/program.service';

@Component({
  selector: 'pp-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {
  public loading: boolean;

  constructor(
    public program: ProgramService
  ) { }

  ngOnInit() {
    this.program.loadPreferences();
  }

  public createProgram(): void {
    const toggleLoading = () => this.loading = !this.loading;
    toggleLoading();
    this.program.plz().pipe(
      tap(() => toggleLoading()),
      take(1)
    ).subscribe();
  }
}
