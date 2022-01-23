import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  httpOptions!: any;
  private apiUrl = environment.serverUrl;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  getComment(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/comments/${id}`);
  }

  postComment(data: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/api/comments/`,
      data,
      this.httpOptions
    );
  }

  updateComment(id: string, data:any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/comments/${id}`, data, this.httpOptions);
  }

	deleteComment(id: string): Observable<any> {
		return this.http.delete<any>(`${this.apiUrl}/api/comments/${id}`);
	}
}
