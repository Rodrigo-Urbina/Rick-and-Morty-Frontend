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
  urlAPI = environment.API;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'cache-control': 'no-cache',
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("currentUser")).token,
    }),
  }

  getEpisode(url: String):Observable<EPISODE>{
    return this.http.get<EPISODE>(`${url}`, this.httpOptions);
  }

  getEpisodeById(id: number):Observable<EPISODE>{
    return this.http.get<EPISODE>(`${this.urlAPI}/episodes/${id}`, this.httpOptions);
  }
}
