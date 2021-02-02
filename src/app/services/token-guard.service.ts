import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenGuardService {

  constructor() { }

  public isAuthenticated(): boolean {
    const jwtHelper = new JwtHelperService();
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if(user) {
      return !jwtHelper.isTokenExpired(user.token);
    }
    return false;
  }

  public isLoggedIn(): boolean {
    if(localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  public getUserData(): any {
    let jwtHelper = new JwtHelperService();
    let user = JSON.parse(localStorage.getItem("currentUser"));
    if(user) {
      return jwtHelper.decodeToken(user.token);
    }
    return '';
  }


}
