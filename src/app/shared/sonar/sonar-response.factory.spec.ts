import { TestBed } from '@angular/core/testing';
import { SonarResponseFactory } from './sonar-response.factory';
import { SONAR_METRICS_RESPONSE } from './sonar-metrics.data';
import { SonarMetrics } from './sonar-metric';

describe('SonarResponseFactory Tests', () => {
  let responseFactory: SonarResponseFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SonarResponseFactory,
      ],
    });
  });

  beforeEach(() => {
    responseFactory = new SonarResponseFactory();
  });

  it('should be instantiable', () => {
    expect(responseFactory).toBeDefined();
  });

  describe('toMetrics', () => {
    it('should return null when null is passed', () => {
      const response = responseFactory.toMetrics(null);
      expect(response).toBeNull();
    });

    it('should return correct response', () => {
      const EXPECTED: SonarMetrics = {
        id: 'AVvK3jXYzD5NsCsieYIU',
        key: 'CLOUD:dashboard',
        name: 'CLOUD/dashboard',
        qualifier: 'TRK',
        metrics: [
          {
            metric: 'sqale_rating',
            value: '1.0',
          },
          {
            metric: 'sqale_index',
            value: '44',
          },
          {
            metric: 'coverage',
            value: '61.4',
          },
          {
            metric: 'alert_status',
            value: 'OK',
          },
          {
            metric: 'ncloc',
            value: '3108',
          },
        ],
        url: 'https://sonar.thecloud.io/dashboard?id=CLOUD:dashboard',
      };

      const response: SonarMetrics = responseFactory.toMetrics(SONAR_METRICS_RESPONSE);
      expect(response).toEqual(EXPECTED);
    });
  });

});
