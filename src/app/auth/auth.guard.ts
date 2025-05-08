import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    UrlTree
  } from '@angular/router';
  import { inject, Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { map, take } from 'rxjs/operators';
  
  import { AuthService } from './auth.service';
  
  @Injectable({ providedIn: 'root' })
  export class AuthGuard implements CanActivate {
    private router = inject(Router);
    private authService =inject(AuthService);
  
    canActivate(
      route: ActivatedRouteSnapshot,
      router: RouterStateSnapshot
    ):
      boolean | UrlTree {
        const user = this.authService.user();
        const isAuth = !!user;
          
          if (isAuth) {
            console.log('User is authenticated');
            return true;
          }
          return this.router.createUrlTree(['/authentication']);
        }
    }
