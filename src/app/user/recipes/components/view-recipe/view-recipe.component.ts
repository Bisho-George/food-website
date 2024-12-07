import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IRecipe } from '../../interfaces/recipe.interface';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss']
})
export class ViewRecipeComponent {
  temporaryData: { recipe: IRecipe};
  baseUrl = 'https://upskilling-egypt.com:3006/';
  constructor(
    public dialogRef: MatDialogRef<ViewRecipeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { recipe: IRecipe },
  ) {
    if (data.recipe !== null) {
      this.temporaryData = JSON.parse(JSON.stringify(data));
      this.temporaryData.recipe.imagePath = data.recipe.imagePath ? `${this.baseUrl}${data.recipe.imagePath}` : null;
    }
    else {
      this.temporaryData = {
        recipe: {
          id: 0, name: '', creationDate: '', modificationDate: '',
          imagePath: null,
          description: '',
          price: 0,
          category: [],
          tag: { id: 0, name: '', creationDate: '', modificationDate: '' },
        }
      };
    }
  }

  addToFav(): void {
    this.dialogRef.close({ id: this.temporaryData.recipe.id });
  }

}
