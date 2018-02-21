import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BuildComponent } from './build.component';
import { ProjectResponseFactory } from '../../../../../shared/project/project-response.factory';
import { ProjectManager } from '../../../../../shared/project/project.manager';
import { DroneService } from '../../../../../shared/drone/drone.service';
import { DroneSocketService } from '../../../../../shared/drone/drone.socket';
import { DroneRequestFactory } from '../../../../../shared/drone/drone-request.factory';
import { BuildResponseFactory } from '../../../../../shared/drone/build/build-response.factory';
import { DRONE_SERVICE_MOCK_PROVIDER } from '../../../../../shared/drone/drone.service.mock';
import { DRONE_SOCKET_SERVICE_MOCK_PROVIDER } from '../../../../../shared/drone/drone.socket.mock';
import { PROJECT_MANAGER_MOCK_PROVIDER } from '../../../../../shared/project/project.manager.mock';
import { ACTIVATED_ROUTE_MOCK_PROVIDER } from '../../../../../../testing/mocks/activated-route.mock';
import { PROJECTS_RESPONSE } from '../../../../../shared/project/projects.data';
import { BUILDS_RESPONSE } from '../../../../../shared/drone/build/builds.data';

describe('BuildComponent', () => {
  let route: ActivatedRoute;
  let droneService: DroneService;
  let droneSocketService: DroneSocketService;
  let projectManager: ProjectManager;
  let projectResponseProcessor: ProjectResponseFactory;
  let buildResponseProcessor: BuildResponseFactory;

  let component: BuildComponent;
  let fixture: ComponentFixture<BuildComponent>;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(BuildComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [BuildComponent],
        providers: [
          DRONE_SERVICE_MOCK_PROVIDER,
          DRONE_SOCKET_SERVICE_MOCK_PROVIDER,
          PROJECT_MANAGER_MOCK_PROVIDER,
          ACTIVATED_ROUTE_MOCK_PROVIDER,
          ProjectResponseFactory,
          DroneRequestFactory,
          BuildResponseFactory,
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    route = TestBed.get(ActivatedRoute);
    route.params = Observable.of({ buildNumber: 777 });

    buildResponseProcessor = TestBed.get(BuildResponseFactory);
    projectResponseProcessor = TestBed.get(ProjectResponseFactory);
    const PROJECT = projectResponseProcessor.toProject(PROJECTS_RESPONSE[0]);

    projectManager = TestBed.get(ProjectManager);
    projectManager.project = Observable.of(PROJECT);

    droneService = TestBed.get(DroneService);
    droneSocketService = TestBed.get(DroneSocketService);

    spyOn(droneService, 'getBuild').and.returnValues(Observable.of(BUILDS_RESPONSE[0]));
    spyOn(droneSocketService, 'streamBuildFeed').and.returnValues(Observable.of(BUILDS_RESPONSE[0]));

    fixture = TestBed.createComponent(BuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set build properly', () => {
    const EXPECTED = buildResponseProcessor.toBuild(BUILDS_RESPONSE[0]);
    expect(component.build).toEqual(EXPECTED);
  });
});
