import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ILoginResponse, LoginResponse } from '@models';
import { ILoginRequest, LoginRequest } from 'src/domain/models/login/login.request';

export interface IAuthService {
  username: string;
  login(request: ILoginRequest): Observable<ILoginResponse>;
  doRefreshToken(): Observable<boolean>;
  logout(): void;
  isLoggedIn(): boolean;
  isAccessTokenExpired(accessToken: string): boolean;
  getAccessToken(): string;
  setAccessToken(accessToken: string): string;
  getRefreshToken(): string;
  setRefreshToken(refreshToken: string): string;
}

@Injectable()
export class AuthService implements IAuthService {
  public username!: string;
  private accessToken!: string;
  private refreshToken!: string;

  constructor(private http: HttpClient) {}

  public login(request: ILoginRequest): Observable<ILoginResponse> {
    const loginUrl = '/api/auth/login/';
    const credentials = new LoginRequest();
    credentials.username = request.username;
    credentials.password = request.password;

    return this.http.post<any>(loginUrl, credentials).pipe(
      map((response) => {
        // Extract access and refresh tokens from the response
        const accessToken = response.access;
        const refreshToken = response.refresh;

        // Store tokens in local storage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        //also save the tokens to the service it self, for easy access
        this.setAccessToken(accessToken);
        this.setRefreshToken(refreshToken);

        // Return true to indicate successful login
        const loginResponse = new LoginResponse();
        loginResponse.success = true;
        loginResponse.message = 'Login successful';
        return loginResponse;
      }),
      catchError((error) => {
        const loginResponse = new LoginResponse();
        loginResponse.success = false;
        loginResponse.message = 'Login failed';
        return of(loginResponse);
      })
    );
  }

  public doRefreshToken(): Observable<boolean> {
    const refreshTokenUrl = '/api/auth/refresh/';
    const refreshToken = this.getRefreshToken()
      ? this.getRefreshToken()
      : localStorage.getItem('refreshToken');

    // Check if refresh token is available
    if (!refreshToken) {
      return throwError('No refresh token available');
    }

    return this.http
      .post<any>(refreshTokenUrl, { refresh_token: refreshToken })
      .pipe(
        map((response) => {
          // Extract access token from the response
          const accessToken = response.access;

          // Update the access token in local storage
          localStorage.setItem('accessToken', accessToken);

          //update the access token in the service
          this.setAccessToken(accessToken);

          // Return true to indicate successful token refresh
          return true;
        }),
        catchError((error) => {
          // Handle refresh token error (e.g., display error message)
          console.error('Refresh token error:', error);

          // Return false to indicate token refresh failure
          return throwError('Failed to refresh token');
        })
      );
  }

  public logout() {
    //clear our service values and the localstorage ones
    this.accessToken = '';
    localStorage.setItem('accessToken', '');

    this.refreshToken = '';
    localStorage.setItem('refreshToken', '');
  }

  public isLoggedIn(): boolean {
    let isAccessTokenValid = false;

    const tokenToCheck =
      this.getAccessToken() ?? localStorage.getItem('accessToken');
    if (!tokenToCheck) {
      return false;
    }

    isAccessTokenValid = this.isAccessTokenExpired(tokenToCheck);

    return isAccessTokenValid;
  }

  public isAccessTokenExpired(accessToken: string): boolean {
    if (!accessToken) {
      return true;
    }

    try {
      const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));

      // Extract the expiration time from the token payload
      const expirationTime = tokenPayload.exp * 1000; // Convert to milliseconds

      // Get the current time
      const currentTime = Date.now();

      // Compare with the current time
      return currentTime < expirationTime;
    } catch (error) {
      console.error('Error decoding or parsing access token:', error);
      return true; // Treat as expired if decoding or parsing fails
    }
  }

  public getAccessToken(): string {
    return this.accessToken;
  }

  public setAccessToken(value: string): string {
    return (this.accessToken = value);
  }

  public getRefreshToken(): string {
    return this.refreshToken;
  }

  public setRefreshToken(value: string): string {
    return (this.refreshToken = value);
  }
}
