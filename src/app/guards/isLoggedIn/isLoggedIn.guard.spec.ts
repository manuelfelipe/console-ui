import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterMock } from '../../../testing/mocks/router.mock';
import { Observable } from 'rxjs/Observable';

import { IsLoggedInGuard } from './isLoggedIn.guard';
import { UserManager } from '../../shared/user/user.manager';
import { USER_MANAGER_PROVIDER_MOCK } from '../../shared/user/user.manager.mock';
import { USER } from '../../shared/user/user.data';

import Spy = jasmine.Spy;

describe('isLoggedIn Guard Tests', () => {
  let isLoggedInGuard: IsLoggedInGuard;
  let router: Router;
  let userManager: UserManager;

  let routerSpy: Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useClass: RouterMock
        },
        IsLoggedInGuard,
        USER_MANAGER_PROVIDER_MOCK,
      ],
    });
  });

  beforeEach(() => {
    router = TestBed.get(Router);
    routerSpy = spyOn(router, 'navigate');

    isLoggedInGuard = TestBed.get(IsLoggedInGuard);
    userManager = TestBed.get(UserManager);
  });

  it('should be instantiable', () => {
    expect(isLoggedInGuard).toBeDefined();
  });

  it('should return false when no user is returned', done => {
    userManager.user = Observable.of(null);

    isLoggedInGuard.canActivate()
      .subscribe(canActivate => {
        expect(canActivate).toBe(false);
        expect(router.navigate).toHaveBeenCalledWith(['/login']);

        done();
      }, err => {
        done.fail(err);
      });
  });

  it('should return true when valid user is returned', done => {
    userManager.user = Observable.of(USER);

    isLoggedInGuard.canActivate()
      .subscribe(canActivate => {
        expect(canActivate).toBe(true);
        expect(router.navigate).not.toHaveBeenCalledWith(['/login']);

        done();
      }, err => {
        done.fail(err);
      });
  });
});
