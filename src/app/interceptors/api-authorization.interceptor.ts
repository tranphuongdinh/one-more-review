import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * Prefixes all requests with `environment.serverUrl`.
 */
@Injectable()
export class ApiAuthorizationInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token:string = '';
    if (this.auth.isAuthenticated()) {
      token = localStorage.getItem('ACCESS_TOKEN') || '';
    }
    const header: any = {
      'Cache-Control':
        'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
      Pragma: 'no-cache',
      Expires: 'Sat, 01 Jan 2000 00:00:00 GMT',
    };
    if (token && token !== '') {
      header.Authorization = `Bearer ${token}`;
    }
    const authorizationHeader = new HttpHeaders({
      ...header,
    });

    // Add Authorization Header
    request = request.clone({ headers: authorizationHeader });

    return next.handle(request);
  }
}
