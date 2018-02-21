import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { BuildLogsComponent } from './build-logs.component';
import { ProjectResponseFactory } from '../../../../../../shared/project/project-response.factory';
import { DroneRequestFactory } from '../../../../../../shared/drone/drone-request.factory';
import { DRONE_SERVICE_MOCK_PROVIDER } from '../../../../../../shared/drone/drone.service.mock';
import { DroneService } from '../../../../../../shared/drone/drone.service';
import { DroneSocketService } from '../../../../../../shared/drone/drone.socket';
import { DRONE_SOCKET_SERVICE_MOCK_PROVIDER } from '../../../../../../shared/drone/drone.socket.mock';
import { BUILDS_RESPONSE } from '../../../../../../shared/drone/build/builds.data';
import { BuildResponseFactory } from '../../../../../../shared/drone/build/build-response.factory';
import { LOGS_RESPONSE } from '../../../../../../shared/drone/log/logs.data';
import { SimpleChange, SimpleChanges } from '@angular/core';

describe('BuildLogsComponent', () => {
  let component: BuildLogsComponent;
  let fixture: ComponentFixture<BuildLogsComponent>;
  let droneService: DroneService;
  let droneSocketService: DroneSocketService;
  let buildResponseFactory: BuildResponseFactory;
  let droneRequestFactory: DroneRequestFactory;

  let BUILDS;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(BuildLogsComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [BuildLogsComponent],
        providers: [
          DRONE_SERVICE_MOCK_PROVIDER,
          DRONE_SOCKET_SERVICE_MOCK_PROVIDER,
          ProjectResponseFactory,
          BuildResponseFactory,
          DroneRequestFactory,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    droneService = TestBed.get(DroneService);
    droneSocketService = TestBed.get(DroneSocketService);
    droneRequestFactory = TestBed.get(DroneRequestFactory);

    buildResponseFactory = TestBed.get(BuildResponseFactory);
    BUILDS = buildResponseFactory.toBuilds(BUILDS_RESPONSE);

    fixture = TestBed.createComponent(BuildLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getLogs', () => {
    it('should return logs stream if build is running', () => {
      const streamBuildLogsSpy = spyOn(droneSocketService, 'streamBuildLogs').and.returnValue(Observable.of(LOGS_RESPONSE[0]));
      const getBuildLogsSpy = spyOn(droneService, 'getBuildLogs');

      component.build = BUILDS[2];  // BUILDS[2] is running
      component.logsByProcs = [
        {
          proc: 'test',
          logs: LOGS_RESPONSE,
        }
      ];

      component.getLogs('CLOUD', 'console-ui', 12, 1)
        .subscribe(log => {
          expect(log).toEqual(LOGS_RESPONSE[0]);
          expect(component.logsByProcs).toEqual([]);

          expect(streamBuildLogsSpy).toHaveBeenCalledWith('CLOUD', 'console-ui', 12, 1);
          expect(getBuildLogsSpy).not.toHaveBeenCalled();
        });
    });

    it('should return logs if build is finished', () => {
      const streamBuildLogsSpy = spyOn(droneSocketService, 'streamBuildLogs');
      const getBuildLogsSpy = spyOn(droneService, 'getBuildLogs').and.returnValue(Observable.of(LOGS_RESPONSE));

      component.build = BUILDS[0];  // BUILDS[0] is success
      component.logsByProcs = [
        {
          proc: 'test',
          logs: LOGS_RESPONSE,
        }
      ];

      component.getLogs('CLOUD', 'console-ui', 12, 1)
        .subscribe(log => {
          expect(LOGS_RESPONSE).toContain(log);
          expect(component.logsByProcs).toEqual([]);

          expect(streamBuildLogsSpy).not.toHaveBeenCalled();
          expect(getBuildLogsSpy).toHaveBeenCalledWith({
            params: {
              owner: 'CLOUD',
              name: 'console-ui',
              number: 12,
              job: 1,
            }
          });
        });
    });
  });

  describe('ngOnChanges', () => {
    it('should do nothing if this.build is null', () => {
      const getLogsSpy = spyOn(component, 'getLogs');
      component.build = null;

      component.ngOnChanges({});
      expect(getLogsSpy).not.toHaveBeenCalled();
    });

    it('should do nothing if this.build is pending', () => {
      const getLogsSpy = spyOn(component, 'getLogs');
      component.build = BUILDS[1];  // BUILDS[1] is pending

      component.ngOnChanges({});
      expect(getLogsSpy).not.toHaveBeenCalled();
    });

    it('should do nothing if previous build was in progress, current build finished', () => {
      const getLogsSpy = spyOn(component, 'getLogs'); // .and.returnValue(Observable.of(LOGS_RESPONSE));
      component.build = BUILDS[2];  // BUILDS[2] is running
      const changes: SimpleChanges = {
        build: new SimpleChange(BUILDS[2], BUILDS[0], true) // 2 is running, 0 is success
      };
      component.ngOnChanges(changes);

      expect(getLogsSpy).not.toHaveBeenCalled();
    });

    it('should add log to new proc in this.logsByProcs', () => {
      const getLogsSpy = spyOn(component, 'getLogs').and.returnValue(Observable.of(LOGS_RESPONSE[0]));
      component.owner = 'YPID';
      component.repository = 'ypid-proxy';
      component.build = BUILDS[0];  // BUILDS[0] is success
      component.logsByProcs = [];
      component.ngOnChanges(null);

      expect(getLogsSpy).toHaveBeenCalledWith('YPID', 'ypid-proxy', 303, 1);
      expect(component.logsByProcs).toEqual([
        {
          proc: 'clone',
          logs: [
            {
              proc: 'clone',
              pos: 0,
              out: '+ git init'
            }
          ]
        }
      ]);
    });

    it('should add log to existing proc in this.logsByProcs', () => {
      const getLogsSpy = spyOn(component, 'getLogs').and.returnValue(Observable.of(LOGS_RESPONSE[1]));
      component.owner = 'YPID';
      component.repository = 'ypid-proxy';
      component.build = BUILDS[0];  // BUILDS[0] is success
      component.logsByProcs = [
        {
          proc: 'clone',
          logs: [
            {
              proc: 'clone',
              pos: 0,
              out: '+ git init'
            }
          ]
        }
      ];
      component.ngOnChanges(null);

      expect(getLogsSpy).toHaveBeenCalledWith('YPID', 'ypid-proxy', 303, 1);
      expect(component.logsByProcs).toEqual([
        {
          proc: 'clone',
          logs: [
            {
              proc: 'clone',
              pos: 0,
              out: '+ git init'
            },
            {
              proc: 'clone',
              pos: 1,
              out: 'Initialized empty Git repository in /drone/src/git.thecloud.com/projects/CLOUD/repos/dashboard-ui/browse/.git/'
            }
          ]
        }
      ]);
    });
  });
});
