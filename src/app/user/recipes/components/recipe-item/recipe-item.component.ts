import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFavRecipes } from '../../interfaces/fav-recipes.interface';
import { RecipeService } from '../../services/recipe.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent {
  @Input() favRecipe: IFavRecipes | null = null;
  @Output() getRecipes: EventEmitter<void> = new EventEmitter<void>();
  constructor(private recipeService: RecipeService,
    private toast: ToastrService
  ) { }
  deleteFromFav() {
    this.recipeService.deleteFavoriteRecipe(this.favRecipe?.id || 0).subscribe({
      next: () => { },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.toast.success('Recipe deleted from favorites');
        this.getRecipes.emit();
      }
    });
  }
}
