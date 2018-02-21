import { TestBed } from '@angular/core/testing';
import { KubernetesRequestFactory } from './kubernetes-request.factory';
import { BaseRequest } from '../base-service/base-request';
import { EventType } from './event/event';

describe('KubernetesRequestFactory Tests', () => {
  let requestFactory: KubernetesRequestFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        KubernetesRequestFactory,
      ],
    });
  });

  beforeEach(() => {
    requestFactory = new KubernetesRequestFactory();
  });

  it('should be instantiable', () => {
    expect(requestFactory).toBeDefined();
  });

  describe('toGetNamespaceDeploymentsRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          namespace: null,
        }
      };

      const request = requestFactory.toGetNamespaceDeploymentsRequest(null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          namespace: 'NAMESPACE',
        }
      };

      const request = requestFactory.toGetNamespaceDeploymentsRequest('NAMESPACE');
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toGetNamespaceEventsRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          cluster: null,
          namespace: null,
        }
      };

      const request = requestFactory.toGetNamespaceEventsRequest(null, null, null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          cluster: 'CLUSTER',
          namespace: 'NAMESPACE',
        },
        queryParams: {
          type: 'Warning',
        }
      };

      const request = requestFactory.toGetNamespaceEventsRequest('CLUSTER', 'NAMESPACE', EventType.Warning);
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toGetNamespaceKibanaTrafficDashboardURLRequest', () => {
    it('should return null/false values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          namespace: null,
        },
        queryParams: {
          isDarkTheme: false,
        },
      };

      const request = requestFactory.toGetNamespaceKibanaTrafficDashboardURLRequest(null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          namespace: 'NAMESPACE',
        },
        queryParams: {
          isDarkTheme: true,
        },
      };

      const request = requestFactory.toGetNamespaceKibanaTrafficDashboardURLRequest('NAMESPACE', true);
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toGetServiceURLRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          namespace: null,
        },
      };

      const request = requestFactory.toGetServiceURLRequest(null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          namespace: 'NAMESPACE',
        },
      };

      const request = requestFactory.toGetServiceURLRequest('NAMESPACE');
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toGetServiceUpstreamURLRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          namespace: null,
        },
      };

      const request = requestFactory.toGetServiceUpstreamURLRequest(null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          namespace: 'NAMESPACE',
        },
      };

      const request = requestFactory.toGetServiceUpstreamURLRequest('NAMESPACE');
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toGetServiceHealthRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          namespace: null,
        },
      };

      const request = requestFactory.toGetServiceHealthRequest(null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          namespace: 'NAMESPACE',
        },
      };

      const request = requestFactory.toGetServiceHealthRequest('NAMESPACE');
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toGetServiceConfigMapsRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          cluster: null,
          namespace: null,
        },
      };

      const request = requestFactory.toGetServiceConfigMapsRequest(null, null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          cluster: 'CLUSTER',
          namespace: 'NAMESPACE',
        },
      };

      const request = requestFactory.toGetServiceConfigMapsRequest('CLUSTER', 'NAMESPACE');
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toGetDeploymentPodsRequest', () => {
    it('should return null/false values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          namespace: null,
          deployment: null,
          cluster: null,
        },
      };

      const request = requestFactory.toGetDeploymentPodsRequest(null, null, null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          cluster: 'CLUSTER',
          namespace: 'NAMESPACE',
          deployment: 'DEPLOYMENT',
        },
      };

      const request = requestFactory.toGetDeploymentPodsRequest('CLUSTER', 'NAMESPACE', 'DEPLOYMENT');
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toPatchDeploymentScaleRequest', () => {
    it('should return null/false values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          namespace: null,
          deployment: null,
          cluster: null,
        },
        body: {
          scale: null,
        }
      };

      const request = requestFactory.toPatchDeploymentScaleRequest(null, null, null, null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          cluster: 'CLUSTER',
          namespace: 'NAMESPACE',
          deployment: 'DEPLOYMENT',
        },
        body: {
          scale: 2,
        },
      };

      const request = requestFactory.toPatchDeploymentScaleRequest('CLUSTER', 'NAMESPACE', 'DEPLOYMENT', 2);
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toGetPodLogsRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          cluster: null,
          namespace: null,
          pod: null,
        },
        queryParams: {
          container: null,
          previous: false,
        },
      };

      const request = requestFactory.toGetPodLogsRequest(null, null, null, null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          cluster: 'CLUSTER',
          namespace: 'NAMESPACE',
          pod: 'POD',
        },
        queryParams: {
          container: 'CONTAINER',
          previous: true,
        },
      };

      const request = requestFactory.toGetPodLogsRequest('CLUSTER', 'NAMESPACE', 'POD', 'CONTAINER', true);
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toDeletePodRequest', () => {
    it('should return null/false values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          cluster: null,
          namespace: null,
          pod: null,
        },
      };

      const request = requestFactory.toDeletePodRequest(null, null, null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          cluster: 'CLUSTER',
          namespace: 'NAMESPACE',
          pod: 'POD',
        },
      };

      const request = requestFactory.toDeletePodRequest('CLUSTER', 'NAMESPACE', 'POD');
      expect(request).toEqual(EXPECTED);
    });
  });
});
