import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsersFilter } from '../interfaces/users-filter.interface';
import { Observable } from 'rxjs';
import { IResponse } from '../../categories/interfaces/categories-response.interface';
import { IUser } from 'src/app/shared/interfaces/IUser.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  getUsers (params: IUsersFilter): Observable<IResponse<IUser>> {
    return this._http.get<IResponse<IUser>>('Users', {
      params: {
        pageSize: params.pageSize,
        pageNumber: params.pageNumber,
        userName: params.userName,
        email: params.email,
        country: params.country,
        groups: params.groups
      }
    });
  }

  deleteUser (id: number) {
    return this._http.  delete(`Users/${id}`);
  }
}
