import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { text: string, item: any, name?: string},
  ) { }
  closeDialog(): void {
    this.dialogRef.close(null);
  }

  deleteItem(): void {
    this.dialogRef.close({ action: 'delete' });
  }
}
