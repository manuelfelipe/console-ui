import { TestBed } from '@angular/core/testing';
import { BaseRequest } from '../base-service/base-request';
import { UptimeRequestFactory } from './uptime-request.factory';
import { UptimeInterval } from './uptime-interval';

describe('UptimeRequestFactory Tests', () => {
  let requestFactory: UptimeRequestFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UptimeRequestFactory,
      ],
    });
  });

  beforeEach(() => {
    requestFactory = new UptimeRequestFactory();
  });

  it('should be instantiable', () => {
    expect(requestFactory).toBeDefined();
  });

  describe('toGetSLARequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        queryParams: {}
      };

      const request = requestFactory.toGetSLARequest(null, null, null, null, null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        queryParams: {
          category: 'CATEGORY',
          kind: 'KIND',
          namespace: 'NAMESPACE',
          since: 12,
          to: 12,
        }
      };

      const request = requestFactory.toGetSLARequest('CATEGORY', 'KIND', 'NAMESPACE', 12, 12);
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toGetUptimesRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        queryParams: {}
      };

      const request = requestFactory.toGetUptimesRequest(null, null, null, null, null, null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        queryParams: {
          category: 'CATEGORY',
          kind: 'KIND',
          namespace: 'NAMESPACE',
          interval: 'daily',
          since: 12,
          to: 27,
        }
      };

      const request = requestFactory.toGetUptimesRequest('CATEGORY', 'KIND', 'NAMESPACE', UptimeInterval.daily, 12, 27);
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toGetDowntimesRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        queryParams: {}
      };

      const request = requestFactory.toGetDowntimesRequest(null, null, null, null, null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        queryParams: {
          category: 'CATEGORY',
          kind: 'KIND',
          namespace: 'NAMESPACE',
          since: 12,
          to: 27,
        }
      };

      const request = requestFactory.toGetDowntimesRequest('CATEGORY', 'KIND', 'NAMESPACE', 12, 27);
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toGetInfrasUptimesRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        queryParams: {}
      };

      const request = requestFactory.toGetInfrasUptimesRequest(null, null, null, null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        queryParams: {
          kind: 'KIND',
          interval: 'daily',
          since: 12,
          to: 27,
        }
      };

      const request = requestFactory.toGetInfrasUptimesRequest('KIND', UptimeInterval.daily, 12, 27);
      expect(request).toEqual(EXPECTED);
    });
  });
});
