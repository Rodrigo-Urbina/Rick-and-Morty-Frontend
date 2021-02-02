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
      'Content-Type': 'application/json',
      'cache-control': 'no-cache',
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("currentUser")).token,
    }),
  }
  
  getCharacters(): Observable<PAGE>{
    this.pageNumber++;
    return this.http.get<PAGE>(`${this.url}/characters?pageSize=20&page=${this.pageNumber}`, this.httpOptions);
  }

  getCharacter(id: number):Observable<CHARACTER>{
    return this.http.get<CHARACTER>(`${this.url}/characters/${id}`, this.httpOptions);
  }
  
  getCharacterByURL(url: String):Observable<CHARACTER>{
    return this.http.get<CHARACTER>(`${url}`, this.httpOptions);
  }
  
  getCharactersArray(array):Observable<any>{
    return this.http.get<CHARACTER | [CHARACTER]>(`http://localhost:3000/characters/${array}`, this.httpOptions);
  }
  
}


