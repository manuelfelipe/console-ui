import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LatestBuildComponent } from './latest-build.component';
import { PROJECTS_RESPONSE } from '../../../../../shared/project/projects.data';
import { ProjectResponseFactory } from '../../../../../shared/project/project-response.factory';
import { DRONE_SERVICE_MOCK_PROVIDER } from '../../../../../shared/drone/drone.service.mock';
import { DroneService } from '../../../../../shared/drone/drone.service';
import { DroneRequestFactory } from '../../../../../shared/drone/drone-request.factory';
import { BuildResponseFactory } from '../../../../../shared/drone/build/build-response.factory';
import { BUILDS_RESPONSE } from '../../../../../shared/drone/build/builds.data';
import { Project } from '../../../../../shared/project/project';
import Spy = jasmine.Spy;

describe('LatestBuildComponent', () => {
  let component: LatestBuildComponent;
  let fixture: ComponentFixture<LatestBuildComponent>;

  let droneService: DroneService;
  let droneRequestFactory: DroneRequestFactory;
  let buildResponseFactory: BuildResponseFactory;
  let projectResponseFactory: ProjectResponseFactory;

  let latestBuildSpy: Spy;
  let requestFactorySpy: Spy;

  let PROJECT: Project;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(LatestBuildComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [LatestBuildComponent],
        providers: [
          DRONE_SERVICE_MOCK_PROVIDER,
          ProjectResponseFactory,
          BuildResponseFactory,
          DroneRequestFactory,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    droneService = TestBed.get(DroneService);
    droneRequestFactory = TestBed.get(DroneRequestFactory);
    buildResponseFactory = TestBed.get(BuildResponseFactory);

    projectResponseFactory = TestBed.get(ProjectResponseFactory);

    PROJECT = projectResponseFactory.toProject(PROJECTS_RESPONSE[0]);

    latestBuildSpy = spyOn(droneService, 'getLatestBuild').and.returnValue(Observable.of(BUILDS_RESPONSE[0]));
    requestFactorySpy = spyOn(droneRequestFactory, 'toGetLatestBuildRequest').and.callThrough();

    fixture = TestBed.createComponent(LatestBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('should not do anything if project nor namespace not changed', () => {
      component.ngOnChanges({});

      expect(requestFactorySpy).not.toHaveBeenCalled();
      expect(latestBuildSpy).not.toHaveBeenCalled();
    });

    it('should not do anything if this.project or this.namespace is null', () => {
      const changes = {
        project: new SimpleChange(PROJECT, PROJECT, true)
      };
      component.ngOnChanges(changes);

      expect(requestFactorySpy).not.toHaveBeenCalled();
      expect(latestBuildSpy).not.toHaveBeenCalled();
    });

    it('should set branch to master, and build properly', () => {
      const changes = {
        project: new SimpleChange(PROJECT, PROJECT, true)
      };
      component.project = PROJECT;
      component.namespace = 'console-server';
      component.ngOnChanges(changes);

      const BUILD = buildResponseFactory.toBuild(BUILDS_RESPONSE[0]);
      expect(component.build).toEqual(BUILD);
      expect(requestFactorySpy).toHaveBeenCalledWith(PROJECT.repository.owner, PROJECT.repository.name, 'master');
      expect(latestBuildSpy).toHaveBeenCalled();
    });

    it('should set branch to develop', () => {
      const changes = {
        namespace: new SimpleChange('console-server-develop', 'console-server-develop', true)
      };
      component.project = PROJECT;
      component.namespace = 'console-server-develop';
      component.ngOnChanges(changes);

      expect(requestFactorySpy).toHaveBeenCalledWith(PROJECT.repository.owner, PROJECT.repository.name, 'develop');
      expect(latestBuildSpy).toHaveBeenCalled();
    });

    it('should set branch to release', () => {
      const changes = {
        project: new SimpleChange(PROJECT, PROJECT, true)
      };
      component.project = PROJECT;
      component.namespace = 'console-server-qa';
      component.ngOnChanges(changes);

      expect(requestFactorySpy).toHaveBeenCalledWith(PROJECT.repository.owner, PROJECT.repository.name, 'release');
      expect(latestBuildSpy).toHaveBeenCalled();
    });
  });
});
