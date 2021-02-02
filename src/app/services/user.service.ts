import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { apiUrl } from '../constants/urls';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.API;
  user : any ;
  constructor(private http: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'cache-control': 'no-cache',
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("currentUser")).token,
    }),
  }
  
  public userData(){
    const jwtHelper = new JwtHelperService();
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if(user){
      return jwtHelper.decodeToken(user.token);
    }
    return '';
  }

  async getFavorites(){
    this.user = await this.userData();
    return this.http.get<[number]>(`${this.url}/users/favorites/${this.user.email}`, this.httpOptions);
  }

   putFavorites(body:object){
    return this.http.patch<any>(`${this.url}/users/${this.user.email}`, body, this.httpOptions)
  }


}
