import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { NodesResourcesComponent } from './nodes-resources.component';
import { ResourcesService } from '../../../../shared/resources/resources.service';
import { RESOURCES_SERVICE_MOCK_PROVIDER } from '../../../../shared/resources/resources.service.mock';
import { NODES_RESOURCES } from '../../../../shared/resources/nodes-resources.data';
import { MetricRequestFactory } from '../../../../shared/metric/metric-request.factory';
import { MetricResponseFactory } from '../../../../shared/metric/metric-response.factory';
import { METRIC_SERVICE_MOCK_PROVIDER } from '../../../../shared/metric/metric.service.mock';
import { MetricService } from '../../../../shared/metric/metric.service';
import { METRICS_RESPONSE } from '../../../../shared/metric/metrics.data';

describe('NodesResourcesComponent', () => {
  let component: NodesResourcesComponent;
  let fixture: ComponentFixture<NodesResourcesComponent>;

  let resourcesService: ResourcesService;
  let metricService: MetricService;
  let metricRequestFactory: MetricRequestFactory;
  let metricResponseFactory: MetricResponseFactory;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(NodesResourcesComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [NodesResourcesComponent],
        providers: [
          RESOURCES_SERVICE_MOCK_PROVIDER,
          METRIC_SERVICE_MOCK_PROVIDER,
          MetricRequestFactory,
          MetricResponseFactory,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    metricRequestFactory = TestBed.get(MetricRequestFactory);
    metricResponseFactory = TestBed.get(MetricResponseFactory);

    metricService = TestBed.get(MetricService);
    // returning only aws' containers count
    spyOn(metricService, 'getLatestMetric').and.returnValues(Observable.of(METRICS_RESPONSE[0]), Observable.of(METRICS_RESPONSE[1]));

    resourcesService = TestBed.get(ResourcesService);
    spyOn(resourcesService, 'getNodesResources').and.returnValue(Observable.of(NODES_RESOURCES));

    fixture = TestBed.createComponent(NodesResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set containers to aws cluster', () => {
    // [0] is aws cluster, for which we did return containers count
    expect(component.resources[0].container).toBe(679);

    // [1] is gce cluster, for which we did NOT return containers count
    expect(component.resources[1].container).toBeUndefined();
  });
});
