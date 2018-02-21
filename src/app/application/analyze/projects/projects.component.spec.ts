import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ProjectsComponent } from './projects.component';
import { PROJECT_SERVICE_MOCK_PROVIDER } from '../../../shared/project/project.service.mock';
import { TOASTR_SERVICE_MOCK_PROVIDER } from '../../../shared/toastr/toastr.service.mock';
import { ProjectResponseFactory } from '../../../shared/project/project-response.factory';
import { ObjectToArrayPipe } from '../../../shared/pipes/objectToArray/object-to-array.pipe';
import { ProjectManager } from '../../../shared/project/project.manager';
import { ProjectService } from '../../../shared/project/project.service';
import { PROJECTS_RESPONSE } from '../../../shared/project/projects.data';
import { PROJECT_MANAGER_MOCK_PROVIDER } from '../../../shared/project/project.manager.mock';
import { ToastrService } from '../../../shared/toastr/toastr.service';
import { ACTIVATED_ROUTE_MOCK_PROVIDER } from '../../../../testing/mocks/activated-route.mock';
import { ROUTER_MOCK_PROVIDER } from '../../../../testing/mocks/router.mock';
import Spy = jasmine.Spy;

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let toastrService: ToastrService;
  let projectManager: ProjectManager;
  let projectService: ProjectService;
  let projectResponseFactory: ProjectResponseFactory;
  let route: ActivatedRoute;
  let router: Router;

  let updateNamespaceSpy: Spy;
  let updateProjectSpy: Spy;
  let emitSpy: Spy;

  let toastrErrorSpy: Spy;
  let getProjectsSpy: Spy;
  let navigateSpy: Spy;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(ProjectsComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [ProjectsComponent],
        providers: [
          PROJECT_MANAGER_MOCK_PROVIDER,
          PROJECT_SERVICE_MOCK_PROVIDER,
          TOASTR_SERVICE_MOCK_PROVIDER,
          ACTIVATED_ROUTE_MOCK_PROVIDER,
          ROUTER_MOCK_PROVIDER,
          ProjectResponseFactory,
          ObjectToArrayPipe,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    toastrService = TestBed.get(ToastrService);
    projectManager = TestBed.get(ProjectManager);
    projectService = TestBed.get(ProjectService);
    projectResponseFactory = TestBed.get(ProjectResponseFactory);

    toastrErrorSpy = spyOn(toastrService, 'error');
    getProjectsSpy = spyOn(projectService, 'getProjects').and.returnValue(Observable.of(PROJECTS_RESPONSE));

    route = TestBed.get(ActivatedRoute);
    route.queryParams = Observable.of({
      redirect: 'analyze/environment-details'
    });

    router = TestBed.get(Router);
    navigateSpy = spyOn(router, 'navigate');

    updateNamespaceSpy = spyOn(projectManager, 'updateNamespace');
    updateProjectSpy = spyOn(projectManager, 'updateProject');

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    emitSpy = spyOn(component.namespaceSelected, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return projects by repos, sorted by repo owner', () => {
    getProjectsSpy.and.returnValue(Observable.throw('error'));

    component.projectsByRepos = [];
    component.ngOnInit();

    expect(component.projectsByRepos).toEqual([]);
    expect(toastrErrorSpy).toHaveBeenCalledWith(null, 'Error getting projects');
  });

  describe('ngOnInit', () => {
    it('should return projects by repos, sorted by repo owner', () => {
      const EXPECTED = [
        {
          key: 'CLOUD',
          value: [
            projectResponseFactory.toProject(PROJECTS_RESPONSE[2])
          ],
        },
        {
          key: 'YPID',
          value: [
            projectResponseFactory.toProject(PROJECTS_RESPONSE[0]),
            projectResponseFactory.toProject(PROJECTS_RESPONSE[1]),
          ],
        },
      ];

      expect(component.projectsByRepos).toEqual(EXPECTED);
    });
  });

  describe('selectNamespace', () => {
    it('should update namespace and emit it', () => {
      const project = projectResponseFactory.toProject(PROJECTS_RESPONSE[0]);
      const namespace = project.namespaces[0];
      component.selectNamespace(namespace, project);

      expect(updateNamespaceSpy).toHaveBeenCalledWith(namespace.name);
      expect(updateProjectSpy).toHaveBeenCalledWith(project);
      expect(emitSpy).toHaveBeenCalledWith(namespace);
    });

    it('should navigate to proper `redirect`', () => {
      const project = projectResponseFactory.toProject(PROJECTS_RESPONSE[0]);
      const namespace = project.namespaces[0];
      component.selectNamespace(namespace, project);

      expect(navigateSpy).toHaveBeenCalledWith(['analyze', namespace.name, 'environment-details']);
    });
  });

  describe('extractEnv', () => {
    it('should return null if passed null', () => {
      const env = component.extractEnv(null);
      expect(env).toBeNull();
    });

    it('should return dev if ends with -develop', () => {
      const env = component.extractEnv('console-ui-develop');
      expect(env).toBe('dev');
    });

    it('should return qa if ends with -qa', () => {
      const env = component.extractEnv('console-ui-qa');
      expect(env).toBe('qa');
    });

    it('should return prod if ends without -develop or -qa', () => {
      const env = component.extractEnv('console-ui');
      expect(env).toBe('prod');
    });
  });
});
