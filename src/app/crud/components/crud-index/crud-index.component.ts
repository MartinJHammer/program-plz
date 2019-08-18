import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/ui/components/dialog/dialog.component';
import { Entry } from 'src/app/start/models/entry';
import { DatabaseService } from 'src/app/start/services/database.service';

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
    public router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.entries$ = this.db.getEntries(this.collectionName);
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
    this.db
      .setFilters(filterName, this.filterNoExerciseType)
      .runFilters();
  }

  /**
   * Used in the html to request next batch.
   */
  public nextBatch(offset: string): void {
    if (this.db.collectionEnd) {
      return;
    }

    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();

    console.log('nextBatch', end, total, offset);

    if (end === total) {
      this.db.offset$.next(offset);
    }
  }

  public trackById(item: Entry): string {
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
          this.db.deleteFromLocalList(selectedEntry);
        }
      }
    } as MatDialogConfig);
  }
}
