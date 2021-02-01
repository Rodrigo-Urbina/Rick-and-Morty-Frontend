import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { apiUrl } from '../constants/urls';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "cache-control": "no-cache"
    })
  };

  public isLoggedIn(): boolean {
    if(localStorage.getItem("currentUser")) {
      return true;
    }
    return false;
  }

  login(email: string, password: string) {
    let body = {
      "email": email,
      "password": password
    }
    return this.http.post<any>(`${apiUrl}/users/login`, body).pipe(
      map((user) => {
        if(user && user.token) {
          user.activeSession = true;
          localStorage.setItem("currentUser", JSON.stringify(user));
        } else {
          user.activeSession = false;
        }

        return user;
      })
    );
  }
}
