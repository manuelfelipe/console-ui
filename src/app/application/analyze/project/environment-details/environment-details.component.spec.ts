import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { EnvironmentDetailsComponent } from './environment-details.component';
import { PROJECT_MANAGER_MOCK_PROVIDER } from '../../../../shared/project/project.manager.mock';
import { ProjectManager } from '../../../../shared/project/project.manager';
import { ProjectResponseFactory } from '../../../../shared/project/project-response.factory';
import { PROJECTS_RESPONSE } from '../../../../shared/project/projects.data';
import { Project } from '../../../../shared/project/project';

describe('EnvironmentDetailsComponent', () => {
  let component: EnvironmentDetailsComponent;
  let fixture: ComponentFixture<EnvironmentDetailsComponent>;

  let projectManager: ProjectManager;
  let projectResponseFactory: ProjectResponseFactory;

  let PROJECT: Project;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(EnvironmentDetailsComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [EnvironmentDetailsComponent],
        providers: [
          PROJECT_MANAGER_MOCK_PROVIDER,
          ProjectResponseFactory,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    projectResponseFactory = TestBed.get(ProjectResponseFactory);
    PROJECT = projectResponseFactory.toProject(PROJECTS_RESPONSE[0]);

    projectManager = TestBed.get(ProjectManager);
    projectManager.project = Observable.of(PROJECT);
    projectManager.namespace = Observable.of('console-server');

    fixture = TestBed.createComponent(EnvironmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set project and namespace', () => {
      expect(component.project).toEqual(PROJECT);
      expect(component.namespace).toEqual('console-server');
    });
  });
});
