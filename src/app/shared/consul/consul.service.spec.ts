import { ConnectionBackend, Http, HttpModule } from '@angular/http';
import { TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ConfigService } from '../config/config.service';
import { ConsulService } from './consul.service';
import { ConsulRequestFactory } from './consul-request.factory';

describe('ConsulService tests', () => {
  let service: ConsulService;
  let requestFactory: ConsulRequestFactory;
  let configService: ConfigService;
  let backend: MockBackend;
  let http: Http;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      declarations: [],
      providers: [
        ConfigService,
        ConsulService,
        ConsulRequestFactory,
        Http,
        {
          provide: ConnectionBackend,
          useClass: MockBackend,
        },
      ],
    });
  });

  beforeEach(() => {
    service = TestBed.get(ConsulService);
    requestFactory = TestBed.get(ConsulRequestFactory);
    configService = TestBed.get(ConfigService);
    backend = TestBed.get(ConnectionBackend);
    http = TestBed.get(Http);
  });

  it('should be instantiable', () => {
    expect(service).toBeDefined();
  });

  describe('getKeys', () => {
    it('should fail when input param is missing', () => {
      service.getKeys(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetKeysRequest('KEY');
      service.getKeys(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('getValues', () => {
    it('should fail when input param is missing', () => {
      service.getValue(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetValuesRequest('KEY');
      service.getValue(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('setConfig', () => {
    it('should fail when input param is missing', () => {
      service.setConfig(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when `key` param is missing', () => {
      const request = requestFactory.toSetConfigRequest(null, 'configValue');

      service.setConfig(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('key param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toSetConfigRequest('configKey', 'configValue');
      service.setConfig(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('deleteConfig', () => {
    it('should fail when input param is missing', () => {
      service.deleteConfig(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when `key` param is missing', () => {
      const request = requestFactory.toDeleteConfigRequest(null);

      service.deleteConfig(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('key param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toDeleteConfigRequest('KEY');
      service.deleteConfig(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

});
