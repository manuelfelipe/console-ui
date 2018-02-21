import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { NamespacesAutocompleteComponent } from './namespaces-autocomplete.component';
import { ProjectManager } from '../../../shared/project/project.manager';
import { ProjectService } from '../../../shared/project/project.service';
import { ProjectRequestFactory } from '../../../shared/project/project-request.factory';
import { ProjectResponseFactory } from '../../../shared/project/project-response.factory';
import { PROJECTS_RESPONSE } from '../../../shared/project/projects.data';
import { PROJECT_SERVICE_MOCK_PROVIDER } from '../../../shared/project/project.service.mock';
import { PROJECT_MANAGER_MOCK_PROVIDER } from '../../../shared/project/project.manager.mock';
import { NGB_MODAL_MOCK_PROVIDER } from '../../../../testing/mocks/ngb-modal.mock';
import { Router } from '@angular/router';
import { ROUTER_MOCK_PROVIDER } from '../../../../testing/mocks/router.mock';
import { NamespaceSearch } from './namespace-search';

describe('NamespacesAutocompleteComponent', () => {
  let component: NamespacesAutocompleteComponent;
  let fixture: ComponentFixture<NamespacesAutocompleteComponent>;
  let router: Router;
  let ngbModal: NgbModal;
  let projectService: ProjectService;
  let projectManager: ProjectManager;
  let projectRequestFactory: ProjectRequestFactory;
  let projectResponseFactory: ProjectResponseFactory;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(NamespacesAutocompleteComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [NamespacesAutocompleteComponent],
        providers: [
          ProjectRequestFactory,
          ProjectResponseFactory,
          NGB_MODAL_MOCK_PROVIDER,
          PROJECT_SERVICE_MOCK_PROVIDER,
          PROJECT_MANAGER_MOCK_PROVIDER,
          ROUTER_MOCK_PROVIDER,
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    ngbModal = TestBed.get(NgbModal);

    spyOn(router, 'navigate');

    projectManager = TestBed.get(ProjectManager);
    projectService = TestBed.get(ProjectService);
    projectRequestFactory = TestBed.get(ProjectRequestFactory);
    projectResponseFactory = TestBed.get(ProjectResponseFactory);

    spyOn(projectService, 'searchProjects').and.returnValue(Observable.of(PROJECTS_RESPONSE));

    fixture = TestBed.createComponent(NamespacesAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set project properly', () => {
    const updateProjectSpy = spyOn(projectManager, 'updateProject');
    const updateNamespaceSpy = spyOn(projectManager, 'updateNamespace');

    const project = projectResponseFactory.toProject(PROJECTS_RESPONSE[0]);
    component.selectProject({
      item: {
        project: project,
        name: project.namespaces[0].name,
        clusters: project.namespaces[0].clusters
      }
    });

    expect(updateProjectSpy).toHaveBeenCalledWith(project);
    expect(updateNamespaceSpy).toHaveBeenCalledWith(project.namespaces[0].name);
  });

  it('should return empty array if passed empty string', () => {
    const resultsObservable = component.searchNamespaces(Observable.of(''));
    resultsObservable.subscribe(results => {
      expect(results).toEqual([]);
    });
  });

  it('should return the project name', () => {
    const updateProjectSpy = spyOn(projectManager, 'updateProject');
    const updateNamespaceSpy = spyOn(projectManager, 'updateNamespace');

    const project = projectResponseFactory.toProject(PROJECTS_RESPONSE[0]);
    component.selectProject({
      item: {
        project: project,
        name: project.namespaces[0].name,
        clusters: project.namespaces[0].clusters
      }
    });

    const name = component.projectFormatter({
      project: project,
      name: project.namespaces[0].name,
      clusters: project.namespaces[0].clusters
    });

    expect(name).toBe('ypidypid-proxy');
    expect(updateProjectSpy).toHaveBeenCalledWith(project);
    expect(updateNamespaceSpy).toHaveBeenCalledWith(project.namespaces[0].name);
  });

  it('should open modal', () => {
    const openSpy = spyOn(ngbModal, 'open');

    component.openProjectsModal(null);
    expect(openSpy).toHaveBeenCalled();
  });

  describe('searchNamespaces', () => {
    it('should not return results if no query', () => {
      component.searchNamespaces(Observable.of(null))
        .subscribe(namespaceSearches => {
          expect(namespaceSearches).toEqual([]);
        });
    });

    it('should return 5 results with `ypid`', () => {
      const projects = projectResponseFactory.toProjects(PROJECTS_RESPONSE);
      const EXPECTED: NamespaceSearch[] = [
        {
          name: projects[0].namespaces[0].name,
          project: projects[0],
          clusters: projects[0].namespaces[0].clusters,
        },
        {
          name: projects[0].namespaces[1].name,
          project: projects[0],
          clusters: projects[0].namespaces[1].clusters,
        },
        {
          name: projects[0].namespaces[2].name,
          project: projects[0],
          clusters: projects[0].namespaces[2].clusters,
        },
        {
          name: projects[1].namespaces[0].name,
          project: projects[1],
          clusters: projects[1].namespaces[0].clusters,
        },
        {
          name: projects[1].namespaces[1].name,
          project: projects[1],
          clusters: projects[1].namespaces[1].clusters,
        },
      ];

      component.searchNamespaces(Observable.of('ypid'))
        .subscribe(namespaceSearches => {
          expect(namespaceSearches).toEqual(EXPECTED);
        });
    });

    it('should return 1 result with `console`', () => {
      const projects = projectResponseFactory.toProjects(PROJECTS_RESPONSE);
      const EXPECTED: NamespaceSearch[] = [
        {
          name: projects[2].namespaces[0].name,
          project: projects[2],
          clusters: projects[2].namespaces[0].clusters,
        },
      ];

      component.searchNamespaces(Observable.of('console'))
        .subscribe(namespaceSearches => {
          expect(namespaceSearches).toEqual(EXPECTED);
        });
    });
  });

  describe('namespaceSelected', () => {
    it('should do nothing if no modalRef', () => {
      component.modalRef = null;
      component.namespaceSelected({ name: 'console-server' } as any);

      // yeah...
    });

    it('should call modalRef.close()', () => {
      component.modalRef = {
        close: () => {}
      } as any;

      const spy = spyOn(component.modalRef, 'close');
      component.namespaceSelected({ name: 'console-server' } as any);

      expect(spy).toHaveBeenCalled();
    });
  });
});
