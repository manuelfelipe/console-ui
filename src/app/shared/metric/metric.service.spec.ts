import { ConnectionBackend, Http, HttpModule } from '@angular/http';
import { TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ConfigService } from '../config/config.service';
import { MetricService } from './metric.service';
import { MetricRequestFactory } from './metric-request.factory';

describe('MetricService tests', () => {
  let service: MetricService;
  let requestFactory: MetricRequestFactory;
  let configService: ConfigService;
  let backend: MockBackend;
  let http: Http;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [],
      providers: [
        ConfigService,
        MetricService,
        MetricRequestFactory,
        Http,
        {
          provide: ConnectionBackend,
          useClass: MockBackend,
        },
      ],
    });
  });

  beforeEach(() => {
    service = TestBed.get(MetricService);
    requestFactory = TestBed.get(MetricRequestFactory);

    configService = TestBed.get(ConfigService);
    backend = TestBed.get(ConnectionBackend);
    http = TestBed.get(Http);
  });

  it('should be instantiable', () => {
    expect(service).toBeDefined();
  });

  describe('getNews', () => {
    it('should fail when input param is missing', () => {
      service.getLatestMetric(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when type param is missing', () => {
      service.getLatestMetric({})
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('type param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetLatestMetricRequest('deployments');
      service.getLatestMetric(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

});
