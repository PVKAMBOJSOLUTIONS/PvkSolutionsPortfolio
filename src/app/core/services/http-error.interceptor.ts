import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * HTTP Error Interceptor
 * Centralizes error handling for all HTTP requests
 */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        
        // Log error to console (in production, send to logging service)
        console.error('HTTP Error:', {
          url: req.url,
          method: req.method,
          status: error.status,
          message: errorMessage,
          error: error.error
        });
        
        return throwError(() => error);
      })
    );
  }
}

