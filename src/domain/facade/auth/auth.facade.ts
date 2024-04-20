import { Inject, Injectable } from '@angular/core';
import { AUTH_SERVICE_TOKEN } from '@injectionTokens';
import { ILoginRequest, ILoginResponse, UserIdentity } from '@models';
import { IAuthService } from '@services';
import { Observable } from 'rxjs';

@Injectable()
export class AuthFacade {
  constructor(@Inject(AUTH_SERVICE_TOKEN) private authService: IAuthService) {}

  public login(request: ILoginRequest): Observable<ILoginResponse> {
    return this.authService.login(request);
  }
  public doRefreshToken(): Observable<boolean> {
    return this.authService.doRefreshToken();
  }
  public logout(): void {
    return this.authService.logout();
  }
  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  public isAccessTokenExpired(accessToken: string): boolean {
    return this.authService.isAccessTokenExpired(accessToken);
  }
  public getAccessToken(): string {
    return this.authService.getAccessToken();
  }
  public setAccessToken(accessToken: string): string {
    return this.authService.setAccessToken(accessToken);
  }
  public getRefreshToken(): string {
    return this.authService.getRefreshToken();
  }
  public setRefreshToken(refreshToken: string): string {
    return this.authService.setRefreshToken(refreshToken);
  }
  public getCurrentUserIdentity(): UserIdentity {
    return this.authService.getCurrentUserIdentity();
  }
  public isCurrentUserIdentityAdmin(): boolean {
    const userIdentity = this.getCurrentUserIdentity();
    return !!userIdentity?.isAdmin;
  }
}
