import { SonarMetrics } from './sonar-metric';
import { SonarMetricsResponse } from './sonar-metric-response';

export class SonarResponseFactory {
  toMetrics(response: SonarMetricsResponse): SonarMetrics {
    if (!response) {
      return null;
    }

    return {
      id: response.metrics.component.id,
      key: response.metrics.component.key,
      name: response.metrics.component.name,
      qualifier: response.metrics.component.qualifier,
      metrics: response.metrics.component.measures.map(measure => ({
        metric: measure.metric,
        value: measure.value,
      })),
      url: response.url,
    };

  };
}
