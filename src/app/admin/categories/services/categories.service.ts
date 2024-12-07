import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilter } from '../interfaces/filter.interface';
import { IResponse } from '../interfaces/categories-response.interface';
import { ICategory } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _http: HttpClient) { }

  getCategories(params: IFilter): Observable<IResponse<ICategory>> {
    return this._http.get<IResponse<ICategory>>('Category', {
      params: {
        pageSize: params.pageSize,
        pageNumber: params.pageNumber,
        name: params?.name || ''
      }
    });
  }

  addCategory(name: string) {
    return this._http.post('Category', { name });
  }

  updateCategory(id: number, name: string) {
    return this._http.put(`Category/${id}`, { name });
  }

  deleteCategory (id: number) {
    return this._http.delete(`Category/${id}`);
  }
}
