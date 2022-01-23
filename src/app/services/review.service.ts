import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  httpOptions!: any;
  private apiUrl = environment.serverUrl;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  getReview(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/reviews/${id}`);
  }

  postReview(data: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/api/reviews/`,
      data,
      this.httpOptions
    );
  }

  updateReview(id: string, data: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/api/reviews/${id}`,
      data,
      this.httpOptions
    );
  }

  deleteReview(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/reviews/${id}`);
  }
}
