import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions!: any;
  private apiUrl = environment.serverUrl;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  getUser(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/users/${id}`);
  }

  updateUser(user:any, id:string): Observable<any>  {
    return this.http.put<any>(
      `${this.apiUrl}/api/users/${id}`,user,this.httpOptions);

  }
}
