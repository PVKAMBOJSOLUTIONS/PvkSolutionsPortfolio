import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from '../../../enviornment';

/**
 * Base API Service - Provides common HTTP operations for all API services
 * Follows Repository Pattern for better code organization
 */
@Injectable({
  providedIn: 'root'
})
export abstract class BaseApiService {
  protected readonly baseUrl: string;
  protected readonly http: HttpClient;
  protected readonly headers: HttpHeaders;

  constructor(http: HttpClient, endpoint: string) {
    this.http = http;
    this.baseUrl = `${environment.apiUrl}${endpoint}`;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  /**
   * GET request with error handling
   * @param url - Endpoint URL
   * @param params - Query parameters
   * @param retryCount - Number of retry attempts
   */
  protected get<T>(url: string = '', params?: HttpParams, retryCount: number = 1): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${url}`, {
      headers: this.headers,
      params
    }).pipe(
      retry(retryCount),
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  /**
   * POST request with error handling
   * @param url - Endpoint URL
   * @param data - Request body data
   */
  protected post<T>(url: string = '', data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${url}`, data, {
      headers: this.headers
    }).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  /**
   * PUT request with error handling
   * @param url - Endpoint URL
   * @param data - Request body data
   */
  protected put<T>(url: string = '', data: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${url}`, data, {
      headers: this.headers
    }).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  /**
   * DELETE request with error handling
   * @param url - Endpoint URL
   */
  protected delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${url}`, {
      headers: this.headers
    }).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  /**
   * PATCH request with error handling
   * @param url - Endpoint URL
   * @param data - Request body data
   */
  protected patch<T>(url: string = '', data: any): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${url}`, data, {
      headers: this.headers
    }).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  /**
   * Extract data from response
   */
  private extractData<T>(response: T): T {
    return response;
  }

  /**
   * Centralized error handling
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server Error Code: ${error.status}\nMessage: ${error.message}`;
      
      // Log additional error details
      console.error('Error details:', {
        status: error.status,
        message: error.message,
        error: error.error,
        url: error.url
      });
    }

    return throwError(() => new Error(errorMessage));
  }

  /**
   * Add custom headers for specific requests
   */
  protected createHeaders(customHeaders: { [key: string]: string }): HttpHeaders {
    return new HttpHeaders({
      ...Object.fromEntries(this.headers.keys().map(key => [key, this.headers.get(key)!])),
      ...customHeaders
    });
  }

  /**
   * Build query parameters
   */
  protected buildParams(params: { [key: string]: any }): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined) {
        httpParams = httpParams.set(key, params[key].toString());
      }
    });
    return httpParams;
  }
}

