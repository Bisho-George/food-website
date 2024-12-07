import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CropDialogComponent } from './crop-dialog/crop-dialog.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { TruncatePipe } from './pipes/truncate.pipe';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    CropDialogComponent,
    TruncatePipe,
    DeleteDialogComponent,
    SectionHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    MatMenuModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    ImageCropperModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    NgxDropzoneModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    MatMenuModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    ImageCropperModule,
    ReactiveFormsModule,
    TruncatePipe,
    NgOptimizedImage,
    DeleteDialogComponent,
    SectionHeaderComponent,
    NgxDropzoneModule
  ]
})
export class SharedModule { }
