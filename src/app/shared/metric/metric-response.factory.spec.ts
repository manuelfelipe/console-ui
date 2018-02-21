import { TestBed } from '@angular/core/testing';
import { Metric } from './metric';
import { MetricResponseFactory } from './metric-response.factory';
import { METRICS_RESPONSE } from './metrics.data';

describe('MetricResponseFactory Tests', () => {
  let responseFactory: MetricResponseFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MetricResponseFactory,
      ],
    });
  });

  beforeEach(() => {
    responseFactory = new MetricResponseFactory();
  });

  it('should be instantiable', () => {
    expect(responseFactory).toBeDefined();
  });

  describe('toMetric', () => {
    it('should return null when null is passed', () => {
      const response = responseFactory.toMetric(null);
      expect(response).toBeNull();
    });

    it('should return correct response', () => {
      const EXPECTED: Metric = {
        id: 'metric_id_1',
        type: 'deployments',
        value: '5975',
        date: new Date(METRICS_RESPONSE[0].date),
      };

      const response = responseFactory.toMetric(METRICS_RESPONSE[0]);
      expect(response).toEqual(EXPECTED);
    });
  });

  describe('toManyNews', () => {
    it('should return [] when null is passed', () => {
      const response = responseFactory.toMetrics(null);
      expect(response).toEqual([]);
    });

    it('should return correct response', () => {
      const EXPECTED: Metric[] = [
        {
          id: 'metric_id_1',
          type: 'deployments',
          value: '5975',
          date: new Date(METRICS_RESPONSE[0].date),
        },
        {
          id: 'metric_id_2',
          type: 'pods_aws',
          value: '679',
          date: new Date(METRICS_RESPONSE[1].date),
        },
        {
          id: 'metric_id_3',
          type: 'pods_gce',
          value: '78',
          date: new Date(METRICS_RESPONSE[2].date),
        },
        {
          id: 'metric_id_4',
          type: 'developers',
          value: '104',
          date: new Date(METRICS_RESPONSE[3].date),
        },
        {
          id: 'metric_id_5',
          type: 'users',
          value: '115',
          date: new Date(METRICS_RESPONSE[4].date),
        },
      ];

      const response = responseFactory.toMetrics(METRICS_RESPONSE);
      expect(response).toEqual(EXPECTED);
    });
  });

});
