import { TestBed } from '@angular/core/testing';
import { BaseRequest } from '../base-service/base-request';
import { SonarRequestFactory } from './sonar-request.factory';

describe('SonarRequestFactory Tests', () => {
  let requestFactory: SonarRequestFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SonarRequestFactory,
      ],
    });
  });

  beforeEach(() => {
    requestFactory = new SonarRequestFactory();
  });

  it('should be instantiable', () => {
    expect(requestFactory).toBeDefined();
  });

  describe('toGetMetricsRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          owner: null,
          name: null,
          branch: null,
        },
        queryParams: {
          metrics: null,
        },
      };

      const request = requestFactory.toGetMetricsRequest(null, null, null, null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          owner: 'OWNER',
          name: 'NAME',
          branch: 'BRANCH',
        },
        queryParams: {
          metrics: 'METRIC_1,METRIC_2',
        },
      };

      const request = requestFactory.toGetMetricsRequest('OWNER', 'NAME', 'BRANCH', 'METRIC_1,METRIC_2');
      expect(request).toEqual(EXPECTED);
    });
  });

});
