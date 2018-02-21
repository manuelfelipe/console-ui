import { ConnectionBackend, Http, HttpModule } from '@angular/http';
import { TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ResourcesService } from './resources.service';
import { ResourcesRequestFactory } from './resources-request.factory';
import { ConfigService } from '../config/config.service';

describe('ResourcesService tests', () => {
  let service: ResourcesService;
  let requestFactory: ResourcesRequestFactory;
  let configService: ConfigService;
  let backend: MockBackend;
  let http: Http;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [],
      providers: [
        ConfigService,
        ResourcesService,
        ResourcesRequestFactory,
        Http,
        {
          provide: ConnectionBackend,
          useClass: MockBackend,
        },
      ],
    });
  });

  beforeEach(() => {
    service = TestBed.get(ResourcesService);
    requestFactory = TestBed.get(ResourcesRequestFactory);
    configService = TestBed.get(ConfigService);
    backend = TestBed.get(ConnectionBackend);
    http = TestBed.get(Http);
  });

  it('should be instantiable', () => {
    expect(service).toBeDefined();
  });

  describe('getNodesResources', () => {
    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      service.getNodesResources()
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('getNamespaceResources', () => {
    it('should fail when input param is missing', () => {
      service.getNamespaceResources(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when `namespace` param is missing', () => {
      const request = requestFactory.toGetNamespaceResourcesRequest(null);

      service.getNamespaceResources(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('namespace param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetNamespaceResourcesRequest('namespace');
      service.getNamespaceResources(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('getPodResources', () => {
    it('should fail when input param is missing', () => {
      service.getPodResources(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when `cluster` param is missing', () => {
      const request = requestFactory.toGetPodResourcesRequest(null, 'namespace', 'pod');

      service.getPodResources(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('cluster param is required'));
    });

    it('should fail when `namespace` param is missing', () => {
      const request = requestFactory.toGetPodResourcesRequest('cluster', null, 'pod');

      service.getPodResources(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('namespace param is required'));
    });

    it('should fail when `pod` param is missing', () => {
      const request = requestFactory.toGetPodResourcesRequest('cluster', 'namespace', null);

      service.getPodResources(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('pod param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetPodResourcesRequest('cluster', 'namespace', 'pod');
      service.getPodResources(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });
});
