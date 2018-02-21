import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { RouterMock } from '../../testing/mocks/router.mock';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { LoginComponent } from './login.component';
import { UserManager } from '../shared/user/user.manager';
import { USER_MANAGER_PROVIDER_MOCK } from '../shared/user/user.manager.mock';
import { USER } from '../shared/user/user.data';
import { Observable } from 'rxjs/Observable';
import { BITBUCKET_SERVICE_MOCK_PROVIDER } from '../shared/bitbucket/bitbucket.service.mock';
import { BitbucketService } from '../shared/bitbucket/bitbucket.service';
import Spy = jasmine.Spy;

describe('LoginComponent', () => {
  let comp: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let router: Router;
  let userManager: UserManager;
  let bitbucketService: BitbucketService;

  let routerSpy: Spy;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(LoginComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        imports: [
          RouterTestingModule,
        ],
        declarations: [
          LoginComponent,
        ],
        providers: [
          {
            provide: Router,
            useClass: RouterMock
          },
          USER_MANAGER_PROVIDER_MOCK,
          BITBUCKET_SERVICE_MOCK_PROVIDER,
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    bitbucketService = TestBed.get(BitbucketService);

    userManager = TestBed.get(UserManager);
    userManager.user = Observable.of(null);

    spyOn(userManager, 'updateUser');
    routerSpy = spyOn(router, 'navigate');

    fixture = TestBed.createComponent(LoginComponent);
    comp = fixture.componentInstance;
  });

  it('should instantiate comp', () => {
    expect(fixture.componentInstance instanceof LoginComponent).toBe(true);
  });

  it('should not redirect to main page if not logged in', function () {
    expect(router.navigate).not.toHaveBeenCalledWith(['/']);
  });

  it('should not redirect to main page if userManager fails', function () {
    userManager.user = Observable.throw('failed');
    fixture.detectChanges();

    expect(router.navigate).not.toHaveBeenCalledWith(['/']);
  });

  it('should redirect to main page if already logged in', function () {
    userManager.user = new BehaviorSubject(USER);
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should call bitbucketService.login', function () {
    const loginSpy = spyOn(bitbucketService, 'login');
    comp.login();

    expect(loginSpy).toHaveBeenCalled();
  });
});
