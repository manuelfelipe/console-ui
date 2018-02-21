import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HeaderComponent } from './header.component';
import { USER_MANAGER_PROVIDER_MOCK } from '../shared/user/user.manager.mock';
import { UserManager } from '../shared/user/user.manager';
import { USER } from '../shared/user/user.data';
import { ROUTER_MOCK_PROVIDER } from '../../testing/mocks/router.mock';
import { PROJECT_MANAGER_MOCK_PROVIDER } from '../shared/project/project.manager.mock';
import { ProjectManager } from '../shared/project/project.manager';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let projectManager: ProjectManager;
  let userManager: UserManager;
  let router: Router;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(HeaderComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [HeaderComponent],
        providers: [
          PROJECT_MANAGER_MOCK_PROVIDER,
          USER_MANAGER_PROVIDER_MOCK,
          ROUTER_MOCK_PROVIDER,
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    projectManager = TestBed.get(ProjectManager);
    userManager = TestBed.get(UserManager);

    router = TestBed.get(Router);

    projectManager.namespace = Observable.of('console-server');
    userManager.user = Observable.of(USER);

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set user if userManager returns USER', () => {
    expect(component.user).toBe(USER);
  });

  it('should have isProjectContextual to false', () => {
    expect(component.isProjectContextual).toBe(false);
  });

  it('should set namespace if projectManager returns `console-server`', () => {
    expect(component.namespace).toBe('console-server');
  });

  it('should logout user', () => {
    const routerSpy = spyOn(router, 'navigate');
    const userManagerSpy = spyOn(userManager, 'destroy');
    fixture.detectChanges();

    component.logout();

    expect(userManagerSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/login']);
  });
});
