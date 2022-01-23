import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  httpOptions!: any;
  private apiUrl = environment.serverUrl;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  getFilm(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/films/${id}`);
  }

  getAllFilms(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/films/films`);
  }

  deleteFilm(id: string): Observable<Movie> {
    return this.http.delete<Movie>(`${this.apiUrl}/api/films/${id}`);
  }

  getFilmsByFilter(
    genre: string,
    country: string,
    year: string
  ): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/api/films/?genre=${genre}&country=${country}&year=${year}`
    );
  }

  postFilm(data: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/api/films/`,
      data,
      this.httpOptions
    );
  }

  updateFilm(data: any, id: string): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/api/films/${id}`,
      data,
      this.httpOptions
    );
  }
}
