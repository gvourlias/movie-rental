import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthFacade } from '@facade';
import { Router } from '@angular/router';

@Injectable()
export class TokenRefreshInterceptor implements HttpInterceptor {
  refreshRetries = 2;
  refreshAttemts = 0;

  constructor(private authFacade: AuthFacade, private route: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (this.refreshAttemts > this.refreshRetries) {
            this.route.navigate(['/login']);
            return throwError(error);
          }
          this.refreshAttemts++;

          // Token expired, attempt to refresh
          return this.authFacade.doRefreshToken().pipe(
            switchMap(() => {
              // Retry the original request with the new token
              const newRequest = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${this.authFacade.getAccessToken()}`,
                },
              });
              this.refreshAttemts = 0;
              return next.handle(newRequest);
            }),
            catchError((refreshError) => {
              // Handle refresh error (e.g., logout user)
              return throwError(refreshError);
            })
          );
        }
        // If not a 401 error, just pass it through
        return throwError(error);
      })
    );
  }
}
