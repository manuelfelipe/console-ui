import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { BuildActionsComponent } from './build-actions.component';
import { DroneService } from '../../../../../../shared/drone/drone.service';
import { DroneRequestFactory } from '../../../../../../shared/drone/drone-request.factory';
import { DRONE_SERVICE_MOCK_PROVIDER } from '../../../../../../shared/drone/drone.service.mock';
import { BUILDS_RESPONSE } from '../../../../../../shared/drone/build/builds.data';
import { BuildResponseFactory } from '../../../../../../shared/drone/build/build-response.factory';
import { ProjectResponseFactory } from '../../../../../../shared/project/project-response.factory';
import { TOASTR_SERVICE_MOCK_PROVIDER } from '../../../../../../shared/toastr/toastr.service.mock';
import { ToastrService } from '../../../../../../shared/toastr/toastr.service';
import Spy = jasmine.Spy;

describe('BuildActionsComponent', () => {
  let toastrService: ToastrService;
  let droneService: DroneService;
  let droneRequestFactory: DroneRequestFactory;
  let buildResponseFactory: BuildResponseFactory;
  let projectResponseFactory: ProjectResponseFactory;

  let successSpy: Spy;

  let component: BuildActionsComponent;
  let fixture: ComponentFixture<BuildActionsComponent>;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(BuildActionsComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [BuildActionsComponent],
        providers: [
          DRONE_SERVICE_MOCK_PROVIDER,
          TOASTR_SERVICE_MOCK_PROVIDER,
          DroneRequestFactory,
          BuildResponseFactory,
          ProjectResponseFactory,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    droneService = TestBed.get(DroneService);
    droneRequestFactory = TestBed.get(DroneRequestFactory);
    buildResponseFactory = TestBed.get(BuildResponseFactory);
    projectResponseFactory = TestBed.get(ProjectResponseFactory);

    toastrService = TestBed.get(ToastrService);
    successSpy = spyOn(toastrService, 'success');

    fixture = TestBed.createComponent(BuildActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('restartBuild', () => {
    it('should call restartBuild', () => {
      const restartBuildSpy = spyOn(droneService, 'restartBuild').and.returnValue(Observable.of(true));

      component.build = buildResponseFactory.toBuild(BUILDS_RESPONSE[0]);
      component.owner = 'CLOUD';
      component.repository = 'console-server';

      component.restartBuild();

      expect(successSpy).toHaveBeenCalledWith('Build restarted');
      expect(restartBuildSpy).toHaveBeenCalledWith({
        params: {
          owner: 'CLOUD',
          name: 'console-server',
          number: 303,
        }
      });
    });
  });

  describe('stopBuild', () => {
    it('should call stopBuild', () => {
      const stopBuildSpy = spyOn(droneService, 'stopBuild').and.returnValue(Observable.of(true));

      component.build = buildResponseFactory.toBuild(BUILDS_RESPONSE[0]);
      component.owner = 'CLOUD';
      component.repository = 'console-server';

      component.stopBuild();

      expect(successSpy).toHaveBeenCalledWith('Build stopped');
      expect(stopBuildSpy).toHaveBeenCalledWith({
        params: {
          owner: 'CLOUD',
          name: 'console-server',
          number: 303,
          job: 1,
        }
      });
    });
  });
});
