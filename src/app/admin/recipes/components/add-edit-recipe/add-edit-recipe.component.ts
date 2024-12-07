import { Component, OnInit } from '@angular/core';
import { ITag } from '../../interfaces/tag.interface';
import { RecipeService } from '../../services/recipe.service';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from 'src/app/admin/categories/interfaces/category.interface';
import { IResponse } from 'src/app/admin/categories/interfaces/categories-response.interface';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { CropDialogComponent } from 'src/app/shared/crop-dialog/crop-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { IRecipe } from '../../interfaces/recipe.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-recipe',
  templateUrl: './add-edit-recipe.component.html',
  styleUrls: ['./add-edit-recipe.component.scss']
})
export class AddEditRecipeComponent implements OnInit {
  tags: ITag[] = [];
  categories: ICategory[] = [];
  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl | null = null;
  isDragging = false;
  recipeForm: FormGroup;
  recipe: IRecipe | null = null;
  baseUrl = 'https://upskilling-egypt.com:3006/';

  constructor(
    private sanitizer: DomSanitizer,
    private recipeService: RecipeService,
    private toast: ToastrService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.recipeForm = this.fb.group({
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]],
      tagId: [null, [Validators.required]],
      categoriesIds: [[], [Validators.required]],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getRecipe(+id);
    }
    this.getTags();
    this.getCategories();
  }

  getTags() {
    this.recipeService.getTags().subscribe({
      next: (res: ITag[]) => {
        this.tags = res;
      },
      error: (err) => {
        this.toast.error("Error while getting tags")
      },
      complete: () => { }
    });
  }

  getCategories() {
    this.recipeService.getCategories({
      pageNumber: 0,
      pageSize: 9000,
      name: ''
    }).subscribe({
      next: (res: IResponse<ICategory>) => {
        this.categories = res.data;
      },
      error: (err) => {
        this.toast.error("Error while getting categories")
      },
      complete: () => { }
    });
  }

  // Update this method to accept a file input instead of Event
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event; // This will still work if event contains a file input.
    const file = event.target.files[0];  // Extract file object
    console.log(file); // For debugging
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      const fileEvent = { target: { files: [file] } }; // Mimic file input event
      console.log(file);  // Debugging
      this.fileChangeEvent(fileEvent); // Call fileChangeEvent method to set the image for cropping
      this.openCropDialog(fileEvent);  // Pass the file event to open the crop dialog
    }
  }

  openCropDialog(imageChangedEvent: any): void {
    const dialogRef = this.dialog.open(CropDialogComponent, {
      width: '50%',
      data: { imageChangedEvent }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.croppedImage = result;
        console.log(this.croppedImage);
      }
    });
  }
  private buildFormData(formGroup: FormGroup, fileFields: { [key: string]: File | Blob }): FormData {
    const formData = new FormData();
    // Add all form control values
    Object.keys(formGroup.controls).forEach((key) => {
      const value = formGroup.get(key)?.value;
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });
    // Add file if provided
    Object.keys(fileFields).forEach((key) => {
      const file = fileFields[key];
      if (file) {
        formData.append(key, file);
      }
    })
    return formData;
  }

onSubmitRecipe() {
  // Prepare FormData for submission
  let file: File | Blob | null = null;

  // If there's an existing image and the user hasn't changed it
  const existingImagePath = this.recipe?.imagePath;

  if (existingImagePath && !this.imageChangedEvent) {
    // Convert the existing image path to a Blob
    this.convertImagePathToBlob(existingImagePath).then((imageBlob) => {
      if (imageBlob) {
        // Create a File from the Blob (you can assign a name based on your needs)
        file = new File([imageBlob], 'existing-recipe-image.jpg', { type: imageBlob.type });

        // Build the FormData including the image file and other form fields
        const form = this.buildFormData(this.recipeForm, { recipeImage: file });

        // Call the update method with the new FormData
        if (this.recipe) {
          this.updateRecipe(this.recipe.id, form);
        } else {
          this.addRecipe(form);
        }
      }
    }).catch(error => {
      this.toast.error('Error processing the image: ' + error.message);
    });
  } else if (this.croppedImage) {
    // If the image was changed (cropped image), handle it here
    const croppedImageUrl = (this.croppedImage as any).changingThisBreaksApplicationSecurity;
    if (croppedImageUrl) {
      // Convert the cropped image to Blob and submit it
      fetch(croppedImageUrl)
        .then(response => response.blob())
        .then(blob => {
          file = new File([blob], 'cropped-image.jpg', { type: blob.type });

          const form = this.buildFormData(this.recipeForm, { recipeImage: file });

          if (this.recipe) {
            this.updateRecipe(this.recipe.id, form);
          } else {
            this.addRecipe(form);
          }
        })
        .catch(error => {
          this.toast.error('Error processing the image.');
        });
    }
  } else {
    // If no image, just submit the form without the image field
    const form = this.buildFormData(this.recipeForm, {});
    if (this.recipe) {
      this.updateRecipe(this.recipe.id, form);
    } else {
      this.addRecipe(form);
    }
  }
}

// Helper function to convert image path to Blob
private async convertImagePathToBlob(imagePath: string): Promise<Blob | null> {
  try {
    const response = await fetch(imagePath);
    if (!response.ok) throw new Error('Failed to fetch image');
    return await response.blob();
  } catch (error: any) {
    console.log(error);
    this.toast.error('Error fetching image: ');
    return null;
  }
}

  submitRecipeForm(file: File | Blob | null) {
    const form = this.buildFormData(this.recipeForm, file ? { recipeImage: file } : {});
    if (this.recipe) {
      this.updateRecipe(this.recipe.id, form);
    } else {
      this.addRecipe(form);
    }
  }


  getRecipe(id: number) {
    this.recipeService.getRecipeById(id).subscribe({
      next: (res: IRecipe) => {
        this.recipe = res;
        this.recipeForm.patchValue({
          name: res.name,
          price: res.price,
          description: res.description,
          tagId: res.tag.id,
          categoriesIds: res.category.map((c) => c.id),
        });
        // Store the existing image path in the form
        this.croppedImage = this.baseUrl + res.imagePath;
        this.recipeForm.addControl('imagePath', this.fb.control(res.imagePath));
      },
      error: (err) => {
        this.toast.error(err.error.message);
      },
    });
  }

  addRecipe(form: FormData) {
    this.recipeService.addRecipe(form).subscribe({
      next: (res: any) => {
        this.toast.success(res.message);
      },
      error: (err) => {
        this.toast.error(err.error.message);
      },
      complete: () => {
        this.location.back();
      }
    });
  }

  updateRecipe(id: number, form: FormData) {
    this.recipeService.updateRecipe(id, form).subscribe({
      next: () => { },
      error: (err) => {
        console.log(err);
        this.toast.error(err.error.message);
      },
      complete: () => {
        this.toast.success('Recipe updated successfully');
        this.location.back();
      }
    })
  }
  private dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([uintArray], { type: mimeString });
  }

}

