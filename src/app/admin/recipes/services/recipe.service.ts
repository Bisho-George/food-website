import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../../categories/interfaces/categories-response.interface';
import { IRecipeFilter } from '../interfaces/recipe-filter.interface';
import { IRecipe } from '../interfaces/recipe.interface';
import { ITag } from '../interfaces/tag.interface';
import { IFilter } from '../../categories/interfaces/filter.interface';
import { ICategory } from '../../categories/interfaces/category.interface';

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


  getCategories(params: IFilter): Observable<IResponse<ICategory>> {
    return this._http.get<IResponse<ICategory>>('Category', {
      params: {
        pageSize: params.pageSize,
        pageNumber: params.pageNumber,
        name: params?.name || ''
      }
    });
  }
  getTags(): Observable<ITag[]> {
    return this._http.get<ITag[]>('tag');
  }

  addRecipe(recipe: FormData) {
    return this._http.post('Recipe', recipe)
  }

  deleteRecipe(id: number) {
    return this._http.delete(`Recipe/${id}`);
  }
  getRecipeById(id: number): Observable<IRecipe> {
    return this._http.get<IRecipe>(`Recipe/${id}`);
  }

  updateRecipe(id: number, recipe: FormData) {
    return this._http.put('Recipe/' + id, recipe);
  }
}
