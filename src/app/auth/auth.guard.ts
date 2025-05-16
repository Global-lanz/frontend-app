import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    CanActivateFn
  } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from './auth.service';

  
export const authGuard: CanActivateFn =
  (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const isLoggedIn = !!authService.user(); //if there is userdata, user is logged in

    if (isLoggedIn) {
      console.log('User is authenticated');
      return true;
    }
    return router.createUrlTree(['/authentication']);
  }

