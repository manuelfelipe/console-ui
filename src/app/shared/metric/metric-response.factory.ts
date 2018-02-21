import { Metric } from './metric';
import { MetricResponse } from './metric-response';

export class MetricResponseFactory {
  toMetric(metricResponse: MetricResponse): Metric {
    if (!metricResponse) {
      return null;
    }

    return {
      id: metricResponse._id,
      type: metricResponse.type,
      value: metricResponse.value,
      date: new Date(metricResponse.date),
    };
  };

  toMetrics(metrics: MetricResponse[]): Metric[] {
    if (!metrics) {
      return [];
    }

    return metrics.map(metric => this.toMetric(metric));
  };
}
