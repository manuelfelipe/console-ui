import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { RouterMock } from '../../testing/mocks/router.mock';
import { Observable } from 'rxjs/Observable';

import { LoginCallbackComponent } from './login-callback.component';
import { UserManager } from '../shared/user/user.manager';
import { USER_MANAGER_PROVIDER_MOCK } from '../shared/user/user.manager.mock';
import { BITBUCKET_SERVICE_MOCK_PROVIDER } from '../shared/bitbucket/bitbucket.service.mock';
import { BitbucketService } from '../shared/bitbucket/bitbucket.service';
import { ParamsService } from '../shared/params/params.service';
import { ParamsServiceMock } from '../shared/params/params.service.mock';
import { BitbucketRequestFactory } from 'app/shared/bitbucket/bitbucket-request.factory';
import { UserResponseFactory } from '../shared/user/user-response.factory';
import { USER } from '../shared/user/user.data';
import Spy = jasmine.Spy;

describe('LoginCallbackComponent', () => {
  let comp: LoginCallbackComponent;
  let fixture: ComponentFixture<LoginCallbackComponent>;

  let router: Router;
  let userManager: UserManager;
  let userResponseFactory: UserResponseFactory;
  let paramsService: ParamsService;
  let bitbucketService: BitbucketService;

  let routerSpy: Spy;

  const OAUTH_PARAMS = {
    oauth_token: 'oauth_token',
    oauth_verifier: 'oauth_verifier'
  };

  beforeEach(async(() => {
    TestBed
      .overrideComponent(LoginCallbackComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        imports: [
          RouterTestingModule,
        ],
        declarations: [
          LoginCallbackComponent,
        ],
        providers: [
          {
            provide: Router,
            useClass: RouterMock
          },
          {
            provide: ParamsService,
            useClass: ParamsServiceMock,
          },
          UserResponseFactory,
          BitbucketRequestFactory,
          USER_MANAGER_PROVIDER_MOCK,
          BITBUCKET_SERVICE_MOCK_PROVIDER,
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    userManager = TestBed.get(UserManager);
    userResponseFactory = TestBed.get(UserResponseFactory);
    paramsService = TestBed.get(ParamsService);
    bitbucketService = TestBed.get(BitbucketService);

    routerSpy = spyOn(router, 'navigate');

    fixture = TestBed.createComponent(LoginCallbackComponent);
    comp = fixture.componentInstance;
  });

  it('should instantiate comp', () => {
    expect(fixture.componentInstance instanceof LoginCallbackComponent).toBe(true);
  });

  it('should not redirect to main page if paramsService fails', function () {
    spyOn(paramsService, 'getParams').and.returnValue(Observable.throw('failed'));
    const updateUserSpy = spyOn(userManager, 'updateUser');
    fixture.detectChanges();

    expect(router.navigate).not.toHaveBeenCalled();
    expect(updateUserSpy).not.toHaveBeenCalled();
  });

  it('should not redirect to main page if paramsService returns no params', function () {
    spyOn(paramsService, 'getParams').and.returnValue(Observable.of({}));
    const updateUserSpy = spyOn(userManager, 'updateUser');
    fixture.detectChanges();

    expect(router.navigate).not.toHaveBeenCalled();
    expect(updateUserSpy).not.toHaveBeenCalled();
  });

  it('should not redirect to main page if bitbucketService fails', function () {
    spyOn(paramsService, 'getParams').and.returnValue(Observable.of(OAUTH_PARAMS));
    spyOn(bitbucketService, 'getProfile').and.returnValue(Observable.throw('failed'));
    const updateUserSpy = spyOn(userManager, 'updateUser');
    fixture.detectChanges();

    expect(router.navigate).not.toHaveBeenCalled();
    expect(updateUserSpy).not.toHaveBeenCalled();
  });

  it('should redirect to main page and set token to localStorage', function () {
    const localStorageSetSpy = spyOn(localStorage, 'setItem');
    spyOn(paramsService, 'getParams').and.returnValue(Observable.of(OAUTH_PARAMS));
    spyOn(bitbucketService, 'getProfile').and.returnValue(Observable.of(USER));
    const updateUserSpy = spyOn(userManager, 'updateUser');
    fixture.detectChanges();

    expect(localStorageSetSpy).toHaveBeenCalledWith('thecloud.token', 'j.w.t.token');
    expect(router.navigate).toHaveBeenCalledWith(['/']);
    expect(updateUserSpy).toHaveBeenCalled();
  });
});
