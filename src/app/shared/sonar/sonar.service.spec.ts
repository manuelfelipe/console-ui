import { ConnectionBackend, Http, HttpModule } from '@angular/http';
import { TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ConfigService } from '../config/config.service';
import { SonarService } from './sonar.service';
import { SonarRequestFactory } from './sonar-request.factory';

describe('SonarService tests', () => {
  let service: SonarService;
  let requestFactory: SonarRequestFactory;
  let configService: ConfigService;
  let backend: MockBackend;
  let http: Http;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [],
      providers: [
        ConfigService,
        SonarRequestFactory,
        SonarService,
        Http,
        {
          provide: ConnectionBackend,
          useClass: MockBackend,
        },
      ],
    });
  });

  beforeEach(() => {
    service = TestBed.get(SonarService);
    requestFactory = TestBed.get(SonarRequestFactory);
    configService = TestBed.get(ConfigService);
    backend = TestBed.get(ConnectionBackend);
    http = TestBed.get(Http);
  });

  it('should be instantiable', () => {
    expect(service).toBeDefined();
  });

  describe('getMetrics', () => {
    it('should fail when input param is missing', () => {
      service.getMetrics(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when `owner` param is missing', () => {
      const request = requestFactory.toGetMetricsRequest(null, 'name', 'branch', 'metrics');

      service.getMetrics(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('owner param is required'));
    });

    it('should fail when `name` param is missing', () => {
      const request = requestFactory.toGetMetricsRequest('owner', null, 'branch', 'metrics');

      service.getMetrics(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('name param is required'));
    });

    it('should fail when `branch` param is missing', () => {
      const request = requestFactory.toGetMetricsRequest('owner', 'name', null, 'metrics');

      service.getMetrics(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('branch param is required'));
    });

    it('should fail when `branch` param is missing', () => {
      const request = requestFactory.toGetMetricsRequest('owner', 'name', 'branch', null);

      service.getMetrics(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('metrics queryParam is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetMetricsRequest('owner', 'name', 'branch', 'metrics');
      service.getMetrics(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('getProjects', () => {
    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      service.getProjects()
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

});
