import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/ui/components/dialog/dialog.component';
import { Entry } from 'src/app/start/models/entry';
import { CrudService } from '../../services/crud.service';
import { DataService } from 'src/app/start/services/data-service';

@Component({
  selector: 'pp-crud-index',
  templateUrl: './crud-index.component.html',
  styleUrls: ['./crud-index.component.scss']
})
export class CrudIndexComponent implements OnInit, OnDestroy {
  @Input() public searchEnabled = false;
  @Input() public dataService: DataService<any>;
  public collection: string;
  public entries$: Observable<Entry[]>;
  public showActions: boolean;
  public filterNoExerciseType = false; // Needs to be removed

  constructor(
    public service: CrudService<any>,
    public router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.collection = this.dataService.collection;
    this.entries$ = this.dataService.getAll();
  }

  ngOnDestroy(): void {
  }

  public toggleActions() {
    this.showActions = !this.showActions;
  }

  public routeToHit(hit: any): void {
    this.router.navigate([`${this.collection}/edit`, hit.id]);
  }

  public applyFilter(filterName: string) {
    this.service
      .setFilters(filterName, this.filterNoExerciseType)
      .runFilters();
  }

  public trackById(index: any, item: Entry): string {
    let temp = index; temp = temp;
    return item.id;
  }

  public delete(selectedEntry: Entry): void {
    this.dialog.open(DialogComponent, {
      minWidth: '250px',
      data: {
        title: `Are you sure you want to remove ${selectedEntry.name}`,
        body: 'This cannot be undone.',
        logic: () => {
          this.dataService.delete(selectedEntry.id);
          // this.service.removeFromEntries$(selectedEntry);
        }
      }
    } as MatDialogConfig);
  }
}
