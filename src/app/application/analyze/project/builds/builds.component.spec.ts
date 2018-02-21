import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BuildsComponent } from './builds.component';
import { DRONE_SERVICE_MOCK_PROVIDER } from '../../../../shared/drone/drone.service.mock';
import { BuildResponseFactory } from '../../../../shared/drone/build/build-response.factory';
import { DroneRequestFactory } from '../../../../shared/drone/drone-request.factory';
import { DroneService } from '../../../../shared/drone/drone.service';
import { BUILDS_RESPONSE } from '../../../../shared/drone/build/builds.data';
import { ProjectResponseFactory } from '../../../../shared/project/project-response.factory';
import { CONTRIBUTORS } from '../../../../shared/drone/build/contributors.data';
import { PROJECT_MANAGER_MOCK_PROVIDER } from '../../../../shared/project/project.manager.mock';
import { ACTIVATED_ROUTE_MOCK_PROVIDER } from '../../../../../testing/mocks/activated-route.mock';
import Spy = jasmine.Spy;

describe('BuildsComponent', () => {
  let component: BuildsComponent;
  let fixture: ComponentFixture<BuildsComponent>;

  let droneService: DroneService;
  let buildResponseFactory: BuildResponseFactory;
  let route: ActivatedRoute;

  let getBuildsSpy: Spy;
  let getContributorsSpy: Spy;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(BuildsComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [BuildsComponent],
        providers: [
          DRONE_SERVICE_MOCK_PROVIDER,
          ProjectResponseFactory,
          DroneRequestFactory,
          BuildResponseFactory,
          PROJECT_MANAGER_MOCK_PROVIDER,
          ACTIVATED_ROUTE_MOCK_PROVIDER,
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    droneService = TestBed.get(DroneService);
    buildResponseFactory = TestBed.get(BuildResponseFactory);

    getBuildsSpy = spyOn(droneService, 'getBuilds').and.returnValues(Observable.of(BUILDS_RESPONSE));
    getContributorsSpy = spyOn(droneService, 'getContributors').and.returnValues(Observable.of(CONTRIBUTORS));

    route = TestBed.get(ActivatedRoute);
    route.params = Observable.of({
      owner: 'CLOUD',
      repository: 'console-server'
    });

    fixture = TestBed.createComponent(BuildsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should have builds and contributors', () => {
      const EXPECTED = buildResponseFactory.toBuilds(BUILDS_RESPONSE);

      expect(component.builds).toEqual(EXPECTED);
      expect(component.contributors).toEqual(CONTRIBUTORS);
    });
  });
});
