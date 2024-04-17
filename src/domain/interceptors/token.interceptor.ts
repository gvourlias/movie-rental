import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthFacade } from '@facade';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authFacade: AuthFacade) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token expired, attempt to refresh
          return this.authFacade.doRefreshToken().pipe(
            switchMap(() => {
              // Retry the original request with the new token
              const newRequest = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${this.authFacade.getAccessToken()}`
                }
              });
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