import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthFacade } from '@facade';
import {
  DepositResponse,
  IDepositRequest,
  IDepositResponse,
  IUser,
  User,
} from '@models';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private authFacade: AuthFacade, private http: HttpClient) {}

  public fetchUserProfile(): Observable<IUser> {
    return this.http.get<any>('/api/rent-store/profile/').pipe(
      map((response) => {
        const user = new User(response);
        return user;
      })
    );
  }

  public depositToAccount(
    depositRequest: IDepositRequest
  ): Observable<IDepositResponse> {
    return this.http
      .patch('/api/rent-store/profile/', {
        deposit: depositRequest.deposit,
      })
      .pipe(
        map((response) => {
          const depositResponse = new DepositResponse(response);
          depositResponse.success = true;
          return depositResponse;
        }),
        catchError((error) => {
          const depositResponse = new DepositResponse();
          depositResponse.success = false;
          depositResponse.message = error.message;
          return of(depositResponse);
        })
      );
  }

  public isCurrentUserIdentityAdmin(): boolean {
    return this.authFacade.getCurrentUserIdentity().isAdmin;
  }
}
