import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-crop-dialog',
  templateUrl: './crop-dialog.component.html',
  styleUrls: ['./crop-dialog.component.scss']
})
export class CropDialogComponent {
  imageChangedEvent: any;
croppedImage: SafeUrl | null = null;


  constructor(
    private sanitizer: DomSanitizer,
    private dialogRef: MatDialogRef<CropDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.imageChangedEvent = data.imageChangedEvent;
  }

  onImageCropped(event: any): void {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
  }

  onImageLoaded(): void {
  }

  onCropperReady(): void {
  }

  onLoadImageFailed(): void {
  }

  onCancel(): void {
    this.dialogRef.close(null); // Close dialog without saving
  }

  onConfirm(): void {
    this.dialogRef.close(this.croppedImage); // Close dialog with cropped image
  }
}
