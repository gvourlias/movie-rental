import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginResponse, LoginResponse, ILoginRequest, UserIdentity } from '@models';
import { IAuthService } from '@services';

@Injectable({
  providedIn: 'root',
})
export class MockAuthService implements IAuthService {
  public username!: string;
  private accessToken!: string;
  private refreshToken!: string;

  constructor(private http: HttpClient) {}

  public login(request: ILoginRequest): Observable<ILoginResponse> {
    return new Observable((subscriber) => {
      setTimeout(() => {
        const response = new LoginResponse();
        response.success = true;
        response.message = 'Login successful';
        subscriber.next(response);
      }, 100);
    });
  }

  public doRefreshToken(): Observable<boolean> {
    return new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(true);
      }, 100);
    });
  }

  public logout() {
    console.log('logout');
  }

  public isLoggedIn(): boolean {
    return true;
  }

  public isAccessTokenExpired(accessToken: string): boolean {
    return false;
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

  getCurrentUserIdentity(): UserIdentity {
    const userIdentity = new UserIdentity();
    userIdentity.username = 'test';
    userIdentity.isAdmin = true;
    return userIdentity;
  }
}
