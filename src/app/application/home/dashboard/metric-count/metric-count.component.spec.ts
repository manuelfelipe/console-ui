import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { MetricCountComponent } from './metric-count.component';
import { METRIC_SERVICE_MOCK_PROVIDER } from '../../../../shared/metric/metric.service.mock';
import { MetricRequestFactory } from '../../../../shared/metric/metric-request.factory';
import { MetricResponseFactory } from '../../../../shared/metric/metric-response.factory';
import { MetricService } from '../../../../shared/metric/metric.service';
import { METRICS_RESPONSE } from '../../../../shared/metric/metrics.data';

describe('MetricCountComponent', () => {
  let service: MetricService;
  let requestFactory: MetricRequestFactory;
  let responseFactory: MetricResponseFactory;

  let component: MetricCountComponent;
  let fixture: ComponentFixture<MetricCountComponent>;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(MetricCountComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [MetricCountComponent],
        providers: [
          METRIC_SERVICE_MOCK_PROVIDER,
          MetricRequestFactory,
          MetricResponseFactory
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    requestFactory = TestBed.get(MetricRequestFactory);
    responseFactory = TestBed.get(MetricResponseFactory);

    service = TestBed.get(MetricService);
    spyOn(service, 'getLatestMetric').and.returnValue(Observable.of(METRICS_RESPONSE[0]));

    fixture = TestBed.createComponent(MetricCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should set metric\'s value', () => {
    expect(component.count).toBe(+METRICS_RESPONSE[0].value);
  });
});
