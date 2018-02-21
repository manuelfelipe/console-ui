import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserManager } from '../../shared/user/user.manager';

@Injectable()
export class IsLoggedInGuard implements CanActivate {

  constructor(private router: Router,
              private userManager: UserManager) {
  }

  canActivate(): Observable<boolean> {
    return this.userManager.user
      .map(user => {
        if (!user) {
          this.router.navigate(['/login']);
          return false;
        }

        return true;
      });
  }
}
