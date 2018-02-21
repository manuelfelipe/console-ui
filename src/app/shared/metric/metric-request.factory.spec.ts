import { TestBed } from '@angular/core/testing';
import { BaseRequest } from '../base-service/base-request';
import { MetricRequestFactory } from './metric-request.factory';

describe('MetricRequestFactory Tests', () => {
  let requestFactory: MetricRequestFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MetricRequestFactory,
      ],
    });
  });

  beforeEach(() => {
    requestFactory = new MetricRequestFactory();
  });

  it('should be instantiable', () => {
    expect(requestFactory).toBeDefined();
  });

  describe('toGetLatestMetricRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          type: null,
        }
      };

      const request = requestFactory.toGetLatestMetricRequest(null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          type: 'deployments',
        }
      };

      const request = requestFactory.toGetLatestMetricRequest('deployments');
      expect(request).toEqual(EXPECTED);
    });
  });
});
