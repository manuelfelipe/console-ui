import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RouterMock } from '../../../testing/mocks/router.mock';
import { IsValidTokenGuard } from './isValidToken.guard';
import { UserService } from '../../shared/user/user.service';
import { UserManager } from '../../shared/user/user.manager';
import { USER_SERVICE_MOCK_PROVIDER } from '../../shared/user/user.service.mock';
import { USER_MANAGER_PROVIDER_MOCK } from '../../shared/user/user.manager.mock';
import Spy = jasmine.Spy;

describe('IsValidToken Guard Tests', () => {
  let isValidTokenGuard: IsValidTokenGuard;
  let router: Router;
  let userService: UserService;
  let userManager: UserManager;

  let routerSpy: Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useClass: RouterMock
        },
        IsValidTokenGuard,
        USER_SERVICE_MOCK_PROVIDER,
        USER_MANAGER_PROVIDER_MOCK,
      ],
    });
  });

  beforeEach(() => {
    router = TestBed.get(Router);
    routerSpy = spyOn(router, 'navigate');

    isValidTokenGuard = TestBed.get(IsValidTokenGuard);
    userService = TestBed.get(UserService);

    userManager = TestBed.get(UserManager);
    spyOn(userManager, 'destroy');
  });

  it('should be instantiable', () => {
    expect(isValidTokenGuard).toBeDefined();
  });

  it('should return false when invalid token, and navigate', done => {
    spyOn(userService, 'validateUserToken').and.returnValue(Observable.throw('Invalid Token'));

    isValidTokenGuard.canActivate()
      .subscribe(canActivate => {
        expect(canActivate).toBe(false);
        expect(router.navigate).toHaveBeenCalledWith(['/login']);

        done();
      }, err => {
        done.fail(err);
      });
  });

  it('should return true when valid token', done => {
    spyOn(userService, 'validateUserToken').and.returnValue(Observable.of('Valid Token'));

    isValidTokenGuard.canActivate()
      .subscribe(canActivate => {
        expect(canActivate).toBe(true);
        expect(router.navigate).not.toHaveBeenCalledWith(['/login']);

        done();
      }, err => {
        done.fail(err);
      });
  });
});
