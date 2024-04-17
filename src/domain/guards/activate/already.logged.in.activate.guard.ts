import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthFacade } from '@facade';
import { Observable } from 'rxjs';

@Injectable()
export class AlreadyLoggedInActivateGuard implements CanActivate {
  constructor(private authFacade: AuthFacade, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authFacade.isLoggedIn()) {
      this.router.navigate(['/']);
    }
    return true;
  }
}
