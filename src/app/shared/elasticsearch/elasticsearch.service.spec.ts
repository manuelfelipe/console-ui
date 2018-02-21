import { ConnectionBackend, Http, HttpModule } from '@angular/http';
import { TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ConfigService } from '../config/config.service';
import { ElasticsearchService } from './elasticsearch.service';
import { ElasticsearchRequestFactory } from './elasticsearch-request.factory';

describe('ElasticsearchService tests', () => {
  let service: ElasticsearchService;
  let requestFactory: ElasticsearchRequestFactory;
  let configService: ConfigService;
  let backend: MockBackend;
  let http: Http;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [],
      providers: [
        ConfigService,
        ElasticsearchService,
        ElasticsearchRequestFactory,
        Http,
        {
          provide: ConnectionBackend,
          useClass: MockBackend,
        },
      ],
    });
  });

  beforeEach(() => {
    service = TestBed.get(ElasticsearchService);
    requestFactory = TestBed.get(ElasticsearchRequestFactory);

    configService = TestBed.get(ConfigService);
    backend = TestBed.get(ConnectionBackend);
    http = TestBed.get(Http);
  });

  it('should be instantiable', () => {
    expect(service).toBeDefined();
  });

  describe('getLogs', () => {
    it('should fail when input is missing', () => {
      service.getLogs(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when namespace param is missing', () => {
      service.getLogs({})
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('namespace param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetLogsRequest('console-server', 'events', 'timestamp', 'lte', 'desc');
      service.getLogs(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('searchAPICatalog', () => {
    it('should fail when input is missing', () => {
      service.searchAPICatalog(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when environment param is missing', () => {
      service.searchAPICatalog({})
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('environment param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toSearchAPICatalogRequest('dev', 'console-server, cloud');
      service.searchAPICatalog(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('getServiceGroups', () => {
    it('should fail when input is missing', () => {
      service.getServiceGroups(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when environment param is missing', () => {
      service.getServiceGroups({})
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('environment param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetServiceGroupsRequest('dev');
      service.getServiceGroups(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

});
