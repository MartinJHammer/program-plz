import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'pp-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, body: string, logic: () => {} }
  ) { }

  ok(): void {
    this.data.logic();
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
