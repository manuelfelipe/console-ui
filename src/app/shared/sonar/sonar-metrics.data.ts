import { SonarMetricsResponse } from './sonar-metric-response';

export const SONAR_METRICS_RESPONSE: SonarMetricsResponse = {
  metrics: {
    component: {
      id: 'AVvK3jXYzD5NsCsieYIU',
      key: 'CLOUD:dashboard',
      name: 'CLOUD/dashboard',
      qualifier: 'TRK',
      measures: [
        {
          metric: 'sqale_rating',
          value: '1.0',
          periods: [
            {
              index: 1,
              value: '0.0',
            }
          ]
        },
        {
          metric: 'sqale_index',
          value: '44',
          periods: [
            {
              index: 1,
              value: '0'
            }
          ]
        },
        {
          metric: 'coverage',
          value: '61.4',
          periods: [
            {
              index: 1,
              value: '0.10000000000000142'
            }
          ]
        },
        {
          metric: 'alert_status',
          value: 'OK'
        },
        {
          metric: 'ncloc',
          value: '3108',
          periods: [
            {
              index: 1,
              value: '2'
            }
          ]
        }
      ]
    }
  },
  url: 'https://sonar.thecloud.io/dashboard?id=CLOUD:dashboard'
};
