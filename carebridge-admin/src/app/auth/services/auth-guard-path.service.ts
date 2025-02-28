import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardPathService implements CanActivate {

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('access_token');
      const isAuthPath = state.url.includes('/auth');

      if (token && isAuthPath) {
        this.router.navigate([state.url]);
        return false;
      }

      if (token) {
        return true;
      }

      if (!token && !isAuthPath) {
        this.router.navigate(['/auth/login']);
        return false;
      }
    }
    return true;
  }
}