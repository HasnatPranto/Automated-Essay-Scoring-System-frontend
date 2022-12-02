import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validateAuthorization(route,state.url);
  }

  validateAuthorization(route: ActivatedRouteSnapshot, url: any): boolean {
    const session_info = this.authService.getSessionInfo();
    if (session_info) {
      const userRole = session_info.usertype;
      if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
        this.router.navigate(['']);
        return false;
      }
      return true;
    }
    this.router.navigate(['']);
    return false;
  }

}
