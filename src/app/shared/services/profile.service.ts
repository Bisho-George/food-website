import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/IUser.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _http: HttpClient) { }

  getCurrentUser (): Observable<IUser> {
    return this._http.get<IUser>('Users/currentUser');
  }
  updateUser (data: FormData) {
    return this._http.put('Users', data);
  }
}
