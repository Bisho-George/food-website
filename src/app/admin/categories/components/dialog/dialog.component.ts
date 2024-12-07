import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICategory } from '../../interfaces/category.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  temporaryData: { category: ICategory, type: string};
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category: ICategory, type: string },
  ) {
    if (data.category !== null) {
      this.temporaryData = JSON.parse(JSON.stringify(data));
    }
    else {
      this.temporaryData = { category: { id: 0, name: '', creationDate: '', modificationDate: '' }, type: data.type };
    }
  }

  closeDialog(): void {
    this.dialogRef.close({ category: this.temporaryData.category });
  }
}
