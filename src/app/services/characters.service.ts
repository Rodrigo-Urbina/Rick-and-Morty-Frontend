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
        "Bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMTJlYTlmYWUxOWU2MzAyODRlZGU3YiIsImVtYWlsIjoiaXNlbGFAYWRtaW4uY29tIiwiZmlyc3ROYW1lIjoiSXNlbGEiLCJsYXN0TmFtZSI6IkFsdmFyZXoiLCJjZWxscGhvbmUiOiI4MTEzODY3MDg2IiwiZmF2b3JpdGVzIjpbXSwiaWF0IjoxNjEyMTk0OTQzLCJleHAiOjE2MTIxOTg1NDN9.z649wQ5GNr5W8--4vBEzbWp48gnDU1wvcawEZCh-W24',
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

