import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../../Core/Models/UserModel';
import {UserAuthModel} from '../../Core/Models/UserAuthModel';
import {ProfileResponseModel} from '../../Core/Models/ProfileResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AccountsServiceService {

  backEndApi = `${environment.backEndApi}/user/`;

  constructor(private httpClient: HttpClient) { }

  Login(userModel: UserModel): Observable<UserAuthModel> {
    return this.httpClient.post<UserAuthModel>(`${this.backEndApi}login`, userModel);
  }

  register(userModel: UserModel): Observable<UserAuthModel> {
    return this.httpClient.post<UserAuthModel>(`${this.backEndApi}register`, userModel);
  }

  getUserProfile(bearerToken: string): Observable<ProfileResponseModel> {
    return this.httpClient.get<ProfileResponseModel>(`${this.backEndApi}profile`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + bearerToken,
      })
    });
  }
}
