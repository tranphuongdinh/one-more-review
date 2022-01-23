import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslocoService } from '@ngneat/transloco';

/**
 * Adds a default error handler to all requests.
 */
@Injectable()
export class ResponseHandlerInterceptor implements HttpInterceptor {
  constructor(
    private toast: ToastrService,
    private auth: AuthService,
    private translocoService: TranslocoService
  ) {}

  // Customize the default error handler here if needed
  private errorHandler(response: any): Observable<HttpEvent<any>> {
    if (response) {
      if (
        response.status === 401
      ) {
        this.auth.signOut();
      }
      // else if (
      //   response.error &&
      //   response.error.message &&
      //   response.error.message !== ''
      // ) {
      //   this.handleErrorMassages('message.' + response.error.message);
      // }
    }
    throw response;
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => this.errorHandler(error))
    );
  }

  handleErrorMassages(errorCode: string): void {
    // this.toast.error(this.translate.instant(errorCode));
    this.toast.error(this.translocoService.translate(errorCode));
  }
}
