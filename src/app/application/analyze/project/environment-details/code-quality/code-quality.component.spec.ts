import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { CodeQualityComponent } from './code-quality.component';
import { SONAR_SERVICE_MOCK_PROVIDER } from '../../../../../shared/sonar/sonar.service.mock';
import { SonarService } from '../../../../../shared/sonar/sonar.service';
import { SonarRequestFactory } from '../../../../../shared/sonar/sonar-request.factory';
import { SonarResponseFactory } from '../../../../../shared/sonar/sonar-response.factory';
import { Observable } from 'rxjs/Observable';
import { ProjectResponseFactory } from '../../../../../shared/project/project-response.factory';
import { PROJECTS_RESPONSE } from '../../../../../shared/project/projects.data';
import { SONAR_METRICS_RESPONSE } from '../../../../../shared/sonar/sonar-metrics.data';
import { SonarMetrics } from '../../../../../shared/sonar/sonar-metric';
import { Project } from '../../../../../shared/project/project';
import Spy = jasmine.Spy;

describe('CodeQualityComponent', () => {
  let component: CodeQualityComponent;
  let fixture: ComponentFixture<CodeQualityComponent>;

  let projectResponseFactory: ProjectResponseFactory;
  let sonarService: SonarService;
  let sonarResponseFactory: SonarResponseFactory;
  let METRICS: SonarMetrics;

  let PROJECT: Project;
  let getMetricsSpy: Spy;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(CodeQualityComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [CodeQualityComponent],
        providers: [
          SONAR_SERVICE_MOCK_PROVIDER,
          ProjectResponseFactory,
          SonarRequestFactory,
          SonarResponseFactory,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    projectResponseFactory = TestBed.get(ProjectResponseFactory);
    PROJECT = projectResponseFactory.toProject(PROJECTS_RESPONSE[0]);

    sonarService = TestBed.get(SonarService);
    getMetricsSpy = spyOn(sonarService, 'getMetrics').and.returnValue(Observable.of(SONAR_METRICS_RESPONSE));

    sonarResponseFactory = TestBed.get(SonarResponseFactory);
    METRICS = sonarResponseFactory.toMetrics(SONAR_METRICS_RESPONSE);

    fixture = TestBed.createComponent(CodeQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    const changes = {
      project: new SimpleChange('project', 'project', true)
    };

    it('should do nothing if project not changed', () => {
      component.project = PROJECT;
      component.ngOnChanges({});

      expect(component.metrics).toBeUndefined();
      expect(getMetricsSpy).not.toHaveBeenCalled();
    });

    it('should do nothing if project is null', () => {
      component.project = null;
      component.ngOnChanges(changes);

      expect(component.metrics).toBeUndefined();
      expect(getMetricsSpy).not.toHaveBeenCalled();
    });

    it('should set metrics', () => {
      component.project = PROJECT;
      component.ngOnChanges(changes);

      expect(component.metrics).toEqual(METRICS);
    });
  });

  describe('getMetric()', () => {
    it('should return null', () => {
      const metric = component.getMetric(null, null);
      expect(metric).toBeNull();
    });

    it('should return null', () => {
      const metric = component.getMetric(METRICS, null);
      expect(metric).toBeNull();
    });

    it('should return coverage', () => {
      const metric = component.getMetric(METRICS, 'coverage');
      expect(metric).toBe('61.4');
    });

    it('should return sqale_index', () => {
      const metric = component.getMetric(METRICS, 'sqale_index');
      expect(metric).toBe('44');
    });
  });

  describe('getCoverageClass()', () => {
    it('should return danger', () => {
      const coverageClass = component.getCoverageClass(null);
      expect(coverageClass).toBe('danger');
    });

    it('should return danger', () => {
      const coverageClass = component.getCoverageClass(0);
      expect(coverageClass).toBe('danger');
    });

    it('should return danger', () => {
      const coverageClass = component.getCoverageClass(59);
      expect(coverageClass).toBe('danger');
    });

    it('should return warning', () => {
      const coverageClass = component.getCoverageClass(60);
      expect(coverageClass).toBe('warning');
    });

    it('should return warning', () => {
      const coverageClass = component.getCoverageClass(79);
      expect(coverageClass).toBe('warning');
    });

    it('should return success', () => {
      const coverageClass = component.getCoverageClass(80);
      expect(coverageClass).toBe('success');
    });

    it('should return success', () => {
      const coverageClass = component.getCoverageClass(100);
      expect(coverageClass).toBe('success');
    });

  });

});
