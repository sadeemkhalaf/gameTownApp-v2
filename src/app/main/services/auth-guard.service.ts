import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  private _userInfo;

  constructor(private router: Router
            , private _authService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return this._authService.isAuthenticated();
  }
}
