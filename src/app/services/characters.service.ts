import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PAGE } from '../constants/interfaces/page';
import { CHARACTER } from '../constants/interfaces/character';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  url = environment.API;
  pageNumber = 0;
  
  constructor(private http: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'cache-control': 'no-cache',
      Authorization:
        "Bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMTIzMjlkMzE2ODllNWYwNDBjNmYyNSIsImVtYWlsIjoicm9kcmlnb0BhZG1pbi5jb20iLCJmaXJzdE5hbWUiOiJSb2RyaWdvIiwibGFzdE5hbWUiOiJVcmJpbmEiLCJjZWxscGhvbmUiOiI4MTEzODY3MDg2IiwiZmF2b3JpdGVzIjpbMSwzLDUsN10sImlhdCI6MTYxMjIwMjg0MywiZXhwIjoxNjEyMjA2NDQzfQ.9HeifMhM2LguiRMx2dpJyugb7AkOC0y-obNJ-vJ6s5A',
    }),
  }
  
  getCharacters(): Observable<PAGE>{
    this.pageNumber++;
    return this.http.get<PAGE>(`${this.url}/characters?pageSize=20&page=${this.pageNumber}`, this.httpOptions);
  }

  getCharacter(id: number):Observable<CHARACTER>{
    return this.http.get<CHARACTER>(`${this.url}/characters/${id}`, this.httpOptions);
  }

}

