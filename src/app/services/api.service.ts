import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpOptions!: any;
  private apiUrl = environment.serverUrl;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  public signUp(data: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/api/users/register`,
      data,
      this.httpOptions
    );
  }

  public signIn(data: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/api/users/login`,
      data,
      this.httpOptions
    );
  }
}
