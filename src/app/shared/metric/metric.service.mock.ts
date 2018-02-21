import { Observable } from 'rxjs/Observable';
import { MetricService } from './metric.service';
import { MetricResponse } from './metric-response';

class MetricServiceMock {

  getLatestMetric(limit: number): Observable<MetricResponse> {
    throw new Error('NewsServiceMock.getLatestMetric unimplemented');
  }

}

export const METRIC_SERVICE_MOCK_PROVIDER = {
  provide: MetricService,
  useClass: MetricServiceMock,
};
