import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/ui/components/dialog/dialog.component';
import { Entry } from 'src/app/start/models/entry';
import { DatabaseService } from 'src/app/start/services/database.service';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'pp-crud-index',
  templateUrl: './crud-index.component.html',
  styleUrls: ['./crud-index.component.scss']
})
export class CrudIndexComponent implements OnInit, OnDestroy {
  @ViewChild(CdkVirtualScrollViewport) public viewport: CdkVirtualScrollViewport;
  @Input() public collectionName: string;
  @Input() public identifier: string;
  @Input() public searchEnabled = false;
  public entries$: Observable<Entry[]>;
  public showActions: boolean;
  public filterNoExerciseType = false; // Needs to be removed

  constructor(
    public db: DatabaseService<any>,
    public service: CrudService<any>,
    public router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.entries$ = this.service.getEntries(this.collectionName);
  }

  ngOnDestroy(): void {
  }

  public toggleActions() {
    this.showActions = !this.showActions;
  }

  public routeToHit(hit: any): void {
    this.router.navigate([`${this.collectionName}/edit`, hit.id]);
  }

  public applyFilter(filterName: string) {
    this.service
      .setFilters(filterName, this.filterNoExerciseType)
      .runFilters();
  }

  public nextBatch(offset: string): void {
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    this.service.nextBatch(offset, end, total);
  }

  public trackById(index: any, item: Entry): string {
    let temp = index; temp = temp;
    return item.id;
  }

  public delete(selectedEntry: Entry): void {
    this.dialog.open(DialogComponent, {
      minWidth: '250px',
      data: {
        title: `Are you sure you want to remove ${selectedEntry[this.identifier]}`,
        body: 'This cannot be undone.',
        logic: () => {
          this.db.delete(`${this.collectionName}/${selectedEntry.id}`);
          this.service.removeFromEntries$(selectedEntry);
        }
      }
    } as MatDialogConfig);
  }
}
