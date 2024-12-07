import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { IResponse } from 'src/app/admin/categories/interfaces/categories-response.interface';
import { IFavRecipes } from '../../interfaces/fav-recipes.interface';

@Component({
  selector: 'app-fav-recipes',
  templateUrl: './fav-recipes.component.html',
  styleUrls: ['./fav-recipes.component.scss']
})
export class FavRecipesComponent implements OnInit {
  baseUrl = 'https://upskilling-egypt.com:3006/';
  favRecipes: IFavRecipes[] = [];
  getRecipesResponse: IResponse<IFavRecipes> | null = null;
  constructor(private recipeService: RecipeService) { }
  ngOnInit(): void {
    this.getFavoriteRecipes();
  }

  getFavoriteRecipes() {
    this.recipeService.getFavoriteRecipes().subscribe({
      next: (res: IResponse<IFavRecipes>) => {
        console.log(res);
        this.favRecipes = res.data;
        this.favRecipes.forEach((recipe) => {
          recipe.recipe.imagePath = this.baseUrl + recipe.recipe.imagePath;
        });
        this.getRecipesResponse = res;
      }
    });
  }
}
