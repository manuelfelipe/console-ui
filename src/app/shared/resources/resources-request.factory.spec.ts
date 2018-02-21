import { TestBed } from '@angular/core/testing';
import { ResourcesRequestFactory } from './resources-request.factory';
import { BaseRequest } from '../base-service/base-request';

describe('ResourcesRequestFactory Tests', () => {
  let requestFactory: ResourcesRequestFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ResourcesRequestFactory,
      ],
    });
  });

  beforeEach(() => {
    requestFactory = new ResourcesRequestFactory();
  });

  it('should be instantiable', () => {
    expect(requestFactory).toBeDefined();
  });

  describe('toGetNamespaceResourcesRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          namespace: null,
        }
      };

      const request = requestFactory.toGetNamespaceResourcesRequest(null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          namespace: 'NAMESPACE',
        }
      };

      const request = requestFactory.toGetNamespaceResourcesRequest('NAMESPACE');
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toGetPodResourcesRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          cluster: null,
          namespace: null,
          pod: null,
        }
      };

      const request = requestFactory.toGetPodResourcesRequest(null, null, null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          cluster: 'CLUSTER',
          namespace: 'NAMESPACE',
          pod: 'POD',
        }
      };

      const request = requestFactory.toGetPodResourcesRequest('CLUSTER', 'NAMESPACE', 'POD');
      expect(request).toEqual(EXPECTED);
    });
  });
});
