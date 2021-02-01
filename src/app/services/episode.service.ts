import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EPISODE } from '../constants/interfaces/EPISODE';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {
  
  constructor(private http: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'cache-control': 'no-cache',
      Authorization:
        "Bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMTJlYTlmYWUxOWU2MzAyODRlZGU3YiIsImVtYWlsIjoiaXNlbGFAYWRtaW4uY29tIiwiZmlyc3ROYW1lIjoiSXNlbGEiLCJsYXN0TmFtZSI6IkFsdmFyZXoiLCJjZWxscGhvbmUiOiI4MTEzODY3MDg2IiwiZmF2b3JpdGVzIjpbXSwiaWF0IjoxNjEyMjEwMTQ4LCJleHAiOjE2MTIyMjQ1NDh9.TGagQlsZ4cjlFSklJNr8hQhLRYSMLsRGwC3pvt13vjk',
    }),
  }

  getEpisode(url: String):Observable<EPISODE>{
    return this.http.get<EPISODE>(`${url}`, this.httpOptions);
  }
}
