import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../shared/user/user.service';
import { UserManager } from '../../shared/user/user.manager';

@Injectable()
export class IsValidTokenGuard implements CanActivate {

  constructor(private router: Router,
              private userService: UserService,
              private userManager: UserManager) {
  }

  canActivate(): Observable<boolean> {
    return this.userService.validateUserToken()
      .map(() => true)
      .catch(() => {
        localStorage.clear();
        this.userManager.destroy();
        this.router.navigate(['/login']);

        return Observable.of(false);
      });
  }
}
