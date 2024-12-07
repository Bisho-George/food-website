import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private _http: HttpClient) { }

  changePassword (data: FormGroup) {
    return this._http.put('Users/ChangePassword', data);
  }
}
