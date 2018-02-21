import { TestBed } from '@angular/core/testing';
import { BaseRequest } from '../base-service/base-request';
import { ElasticsearchRequestFactory } from './elasticsearch-request.factory';

describe('ElasticsearchRequestFactory Tests', () => {
  let requestFactory: ElasticsearchRequestFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ElasticsearchRequestFactory,
      ],
    });
  });

  beforeEach(() => {
    requestFactory = new ElasticsearchRequestFactory();
  });

  it('should be instantiable', () => {
    expect(requestFactory).toBeDefined();
  });

  describe('toGetNewsRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          namespace: null,
        },
        queryParams: {}
      };

      const request = requestFactory.toGetLogsRequest(null, null, null, null, null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          namespace: 'console-server',
        },
        queryParams: {
          searchText: 'events',
          timestamp: 'timestamp',
          rangeType: 'lte',
          order: 'asc',
          lowerBoundTimestamp: 12,
          upperBoundTimestamp: 27,
        }
      };

      const request = requestFactory.toGetLogsRequest('console-server', 'events', 'timestamp', 'lte', 'asc', 12, 27);
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toSearchAPICatalogRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          environment: null,
        },
        queryParams: {}
      };

      const request = requestFactory.toSearchAPICatalogRequest(null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          environment: 'prod',
        },
        queryParams: {
          serviceGroup: 'thecloud',
          searchTerms: 'console-server, cloud',
        }
      };

      const request = requestFactory.toSearchAPICatalogRequest('prod', 'thecloud', 'console-server, cloud');
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toGetServiceGroupsRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          environment: null,
        },
      };

      const request = requestFactory.toGetServiceGroupsRequest(null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          environment: 'prod',
        },
      };

      const request = requestFactory.toGetServiceGroupsRequest('prod');
      expect(request).toEqual(EXPECTED);
    });
  });
});
