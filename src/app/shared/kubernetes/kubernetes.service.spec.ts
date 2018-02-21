import { ConnectionBackend, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { KubernetesService } from './kubernetes.service';
import { ConfigService } from '../config/config.service';
import { KubernetesRequestFactory } from './kubernetes-request.factory';

describe('KubernetesService tests', () => {
  let service: KubernetesService;
  let requestFactory: KubernetesRequestFactory;
  let configService: ConfigService;
  let backend: MockBackend;
  let http: Http;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [],
      providers: [
        ConfigService,
        KubernetesService,
        KubernetesRequestFactory,
        Http,
        {
          provide: ConnectionBackend,
          useClass: MockBackend,
        },
      ],
    });
  });

  beforeEach(() => {
    service = TestBed.get(KubernetesService);
    requestFactory = TestBed.get(KubernetesRequestFactory);
    configService = TestBed.get(ConfigService);
    backend = TestBed.get(ConnectionBackend);
    http = TestBed.get(Http);
  });

  it('should be instantiable', () => {
    expect(service).toBeDefined();
  });

  describe('getNamespaceKibanaTrafficDashboardURL', () => {
    it('should fail when input param is missing', () => {
      service.getNamespaceKibanaTrafficDashboardURL(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when `namespace` param is missing', () => {
      const request = requestFactory.toGetNamespaceKibanaTrafficDashboardURLRequest(null);

      service.getNamespaceKibanaTrafficDashboardURL(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('namespace param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetNamespaceKibanaTrafficDashboardURLRequest('namespace');
      service.getNamespaceKibanaTrafficDashboardURL(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('getServiceURL', () => {
    it('should fail when input param is missing', () => {
      service.getServiceURL(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when `namespace` param is missing', () => {
      const request = requestFactory.toGetServiceURLRequest(null);

      service.getServiceURL(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('namespace param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetServiceURLRequest('namespace');
      service.getServiceURL(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('getServiceUpstreamURL', () => {
    it('should fail when input param is missing', () => {
      service.getServiceUpstreamURL(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when `namespace` param is missing', () => {
      const request = requestFactory.toGetServiceUpstreamURLRequest(null);

      service.getServiceUpstreamURL(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('namespace param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetServiceUpstreamURLRequest('namespace');
      service.getServiceUpstreamURL(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('getServiceConfigMaps', () => {
    it('should fail when input param is missing', () => {
      service.getServiceConfigMaps(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when `cluster` param is missing', () => {
      const request = requestFactory.toGetServiceConfigMapsRequest(null, 'namespace');

      service.getServiceConfigMaps(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('cluster param is required'));
    });

    it('should fail when `namespace` param is missing', () => {
      const request = requestFactory.toGetServiceConfigMapsRequest('cluster', null);

      service.getServiceConfigMaps(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('namespace param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetServiceConfigMapsRequest('cluster', 'namespace');
      service.getServiceConfigMaps(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('getNamespaceServiceHealth', () => {
    it('should fail when input param is missing', () => {
      service.getServiceHealth(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when `namespace` param is missing', () => {
      const request = requestFactory.toGetServiceHealthRequest(null);

      service.getServiceHealth(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('namespace param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetServiceHealthRequest('namespace');
      service.getServiceHealth(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('getNamespaceLabels', () => {
    it('should fail when input param is missing', () => {
      service.getNamespaceLabels(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when `namespace` param is missing', () => {
      const request = requestFactory.toGetNamespaceLabelsRequest(null);

      service.getNamespaceLabels(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('namespace param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetNamespaceLabelsRequest('namespace');
      service.getNamespaceLabels(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('getNamespaceDeployments', () => {
    it('should fail when input param is missing', () => {
      service.getNamespaceDeployments(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when `namespace` param is missing', () => {
      const request = requestFactory.toGetNamespaceDeploymentsRequest(null);

      service.getNamespaceDeployments(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('namespace param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetNamespaceDeploymentsRequest('namespace');
      service.getNamespaceDeployments(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('getNamespaceEvents', () => {
    it('should fail when input param is missing', () => {
      service.getNamespaceEvents(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when `cluster` param is missing', () => {
      const request = requestFactory.toGetNamespaceEventsRequest(null, 'namespace');

      service.getNamespaceEvents(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('cluster param is required'));
    });

    it('should fail when `namespace` param is missing', () => {
      const request = requestFactory.toGetNamespaceEventsRequest('cluster', null);

      service.getNamespaceEvents(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('namespace param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetNamespaceEventsRequest('cluster', 'namespace');
      service.getNamespaceEvents(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('getDeploymentPods', () => {
    it('should fail when input param is missing', () => {
      service.getDeploymentPods(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when `cluster` param is missing', () => {
      const request = requestFactory.toGetDeploymentPodsRequest(null, 'namespace', 'deployment');

      service.getDeploymentPods(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('cluster param is required'));
    });

    it('should fail when `namespace` param is missing', () => {
      const request = requestFactory.toGetDeploymentPodsRequest('cluster', null, 'deployment');

      service.getDeploymentPods(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('namespace param is required'));
    });

    it('should fail when `deployment` param is missing', () => {
      const request = requestFactory.toGetDeploymentPodsRequest('cluster', 'namespace', null);

      service.getDeploymentPods(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('deployment param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetDeploymentPodsRequest('namespace', 'deployment', 'cluster');
      service.getDeploymentPods(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('patchDeploymentScale', () => {
    it('should fail when input param is missing', () => {
      service.patchDeploymentScale(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when `cluster` param is missing', () => {
      const request = requestFactory.toPatchDeploymentScaleRequest(null, 'namespace', 'deployment', 2);

      service.patchDeploymentScale(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('cluster param is required'));
    });

    it('should fail when `namespace` param is missing', () => {
      const request = requestFactory.toPatchDeploymentScaleRequest('cluster', null, 'deployment', 2);

      service.patchDeploymentScale(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('namespace param is required'));
    });

    it('should fail when `deployment` param is missing', () => {
      const request = requestFactory.toPatchDeploymentScaleRequest('cluster', 'namespace', null, 2);

      service.patchDeploymentScale(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('deployment param is required'));
    });

    it('should fail when `scale` body is missing', () => {
      const request = requestFactory.toPatchDeploymentScaleRequest('namespace', 'deployment', 'cluster', null);

      service.patchDeploymentScale(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('scale body is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toPatchDeploymentScaleRequest('namespace', 'deployment', 'cluster', 2);
      service.patchDeploymentScale(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });

    it('should not fail when passing scale=0', (done) => {
      backend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({
          body: JSON.stringify({
            result: true,
            data: 'data',
          }),
        });

        connection.mockRespond(new Response(new ResponseOptions(options)));
      });

      const request = requestFactory.toPatchDeploymentScaleRequest('namespace', 'deployment', 'cluster', 0);
      service.patchDeploymentScale(request)
        .subscribe(() => {
          done();
        });
    });
  });

  describe('getPodLogs', () => {
    it('should fail when input param is missing', () => {
      service.getPodLogs(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when `cluster` param is missing', () => {
      const request = requestFactory.toGetPodLogsRequest(null, 'namespace', 'pod', 'container');

      service.getPodLogs(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('cluster param is required'));
    });

    it('should fail when `namespace` param is missing', () => {
      const request = requestFactory.toGetPodLogsRequest('cluster', null, 'pod', 'container');

      service.getPodLogs(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('namespace param is required'));
    });

    it('should fail when `pod` param is missing', () => {
      const request = requestFactory.toGetPodLogsRequest('cluster', 'namespace', null, 'container', false);

      service.getPodLogs(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('pod param is required'));
    });

    it('should fail when `container` query param is missing', () => {
      const request = requestFactory.toGetPodLogsRequest('cluster', 'namespace', 'pod', null, false);

      service.getPodLogs(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('container queryParam is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetPodLogsRequest('cluster', 'namespace', 'pod', 'container', true);
      service.getPodLogs(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });

    it('should succeed', (done) => {
      backend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({
          body: JSON.stringify({
            result: true,
            data: 'data',
          }),
        });

        connection.mockRespond(new Response(new ResponseOptions(options)));
      });

      const request = requestFactory.toGetPodLogsRequest('cluster', 'namespace', 'pod', 'container', true);
      service.getPodLogs(request)
        .subscribe(() => {
          done();
        });
    });
  });

  describe('deletePod', () => {
    it('should fail when input param is missing', () => {
      service.deletePod(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when `cluster` param is missing', () => {
      const request = requestFactory.toDeletePodRequest(null, 'namespace', 'pod');

      service.deletePod(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('cluster param is required'));
    });

    it('should fail when `namespace` param is missing', () => {
      const request = requestFactory.toDeletePodRequest('cluster', null, 'pod');

      service.deletePod(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('namespace param is required'));
    });

    it('should fail when `pod` param is missing', () => {
      const request = requestFactory.toDeletePodRequest('cluster', 'namespace', null);

      service.deletePod(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('pod param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toDeletePodRequest('cluster', 'namespace', 'pod');
      service.deletePod(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });

    it('should succeed', (done) => {
      backend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({
          body: JSON.stringify({
            result: true,
            data: 'data',
          }),
        });

        connection.mockRespond(new Response(new ResponseOptions(options)));
      });

      const request = requestFactory.toDeletePodRequest('cluster', 'namespace', 'pod');
      service.deletePod(request)
        .subscribe(() => {
          done();
        });
    });
  });
});
