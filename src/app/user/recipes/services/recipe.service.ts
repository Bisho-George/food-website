import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipeFilter } from '../interfaces/recipe-filter.interface';
import { IRecipe } from '../interfaces/recipe.interface';
import { ITag } from '../interfaces/tag.interface';
import { IResponse } from 'src/app/admin/categories/interfaces/categories-response.interface';
import { IFavRecipes } from '../interfaces/fav-recipes.interface';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private _http: HttpClient) { }

  getRecipes(params: IRecipeFilter): Observable<IResponse<IRecipe>> {
    return this._http.get<IResponse<IRecipe>>('Recipe', {
      params: {
        pageSize: params.pageSize,
        pageNumber: params.pageNumber,
        name: params?.name || '',
        tagId: params?.tagId || 0,
        categoryId: params?.categoryId || 0
      }
    });
  }

  getTags(): Observable<ITag[]> {
    return this._http.get<ITag[]>('tag');
  }

  getRecipeById(id: number): Observable<IRecipe> {
    return this._http.get<IRecipe>(`Recipe/${id}`);
  }
  addToFavorite(id: number) {
    return this._http.post('userRecipe', {
      recipeId: id
    });
  }

  getFavoriteRecipes(): Observable<IResponse<IFavRecipes>> {
    return this._http.get<IResponse<IFavRecipes>>('userRecipe');
  }

  deleteFavoriteRecipe(id: number) {
    return this._http.delete(`userRecipe/${id}`);
  }
}
