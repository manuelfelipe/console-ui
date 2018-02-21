import { ConnectionBackend, Http, HttpModule } from '@angular/http';
import { TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ConfigService } from '../config/config.service';
import { ProvisionsService } from './provisions.service';
import { ProvisionsRequestFactory } from './provisions-request.factory';
import { ProvisionAppType } from '../../application/self-service/provisions/provision-app/provision-app-type';
import { ProvisionAppLanguage } from '../../application/self-service/provisions/provision-app/provision-app-language';

describe('ProvisionsService tests', () => {
  let service: ProvisionsService;
  let requestFactory: ProvisionsRequestFactory;
  let configService: ConfigService;
  let backend: MockBackend;
  let http: Http;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [],
      providers: [
        ConfigService,
        ProvisionsService,
        ProvisionsRequestFactory,
        Http,
        {
          provide: ConnectionBackend,
          useClass: MockBackend,
        },
      ],
    });
  });

  beforeEach(() => {
    service = TestBed.get(ProvisionsService);
    requestFactory = TestBed.get(ProvisionsRequestFactory);
    configService = TestBed.get(ConfigService);
    backend = TestBed.get(ConnectionBackend);
    http = TestBed.get(Http);
  });

  it('should be instantiable', () => {
    expect(service).toBeDefined();
  });

  describe('initNewProject', () => {
    it('should fail when input param is missing', () => {
      service.initNewProject(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when owner param is missing', () => {
      const request = requestFactory.toInitNewProjectRequest(null, 'console-server', {});

      service.initNewProject(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('owner param is required'));
    });

    it('should fail when repo param is missing', () => {
      const request = requestFactory.toInitNewProjectRequest('CLOUD', null, {});

      service.initNewProject(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('repo param is required'));
    });

    it('should fail when configs body is missing', () => {
      const request = requestFactory.toInitNewProjectRequest('CLOUD', 'console-server', null);

      service.provisionApp(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('configs body is required'));
    });

    it('should fail when calling service fails', () => {
      const request = requestFactory.toProvisionAppRequest('CLOUD', 'console-server', ProvisionAppLanguage.Java, ProvisionAppType.API);

      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      service.provisionApp(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('provisionApp', () => {
    it('should fail when input param is missing', () => {
      service.provisionApp(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when language body is missing', () => {
      const request = requestFactory.toProvisionAppRequest('CLOUD', 'console-server', null, ProvisionAppType.API);

      service.provisionApp(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('language body is required'));
    });

    it('should fail when type body is missing', () => {
      const request = requestFactory.toProvisionAppRequest('CLOUD', 'console-server', ProvisionAppLanguage.Java, null);

      service.provisionApp(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('type body is required'));
    });

    it('should fail when calling service fails', () => {
      const request = requestFactory.toProvisionAppRequest('CLOUD', 'console-server', ProvisionAppLanguage.Java, ProvisionAppType.API);

      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      service.provisionApp(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('provisionDB', () => {
    it('should fail when input param is missing', () => {
      service.provisionDB(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when type body is missing', () => {
      const request = requestFactory.toProvisionDBRequest('CLOUD', 'console-server', null);

      service.provisionDB(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('type body is required'));
    });

    it('should fail when calling service fails', () => {
      const request = requestFactory.toProvisionDBRequest('CLOUD', 'console-server', 'mongodb');

      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      service.provisionDB(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('checkDNS', () => {
    it('should fail when input param is missing', () => {
      service.checkDNS(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when dns queryParam is missing', () => {
      const request = requestFactory.toCheckDNSRequest(null, 'pj.ca');

      service.checkDNS(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('dns queryParam is required'));
    });


    it('should fail when type queryParam is missing', () => {
      const request = requestFactory.toCheckDNSRequest('avocat', null);

      service.checkDNS(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('type queryParam is required'));
    });

    it('should fail when calling service fails', () => {
      const request = requestFactory.toCheckDNSRequest('avocat', 'pj.ca');

      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      service.checkDNS(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('provisionDNS', () => {
    it('should fail when input param is missing', () => {
      service.provisionDNS(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when dns body is missing', () => {
      const request = requestFactory.toProvisionDNSRequest('CLOUD', 'console-server', null);

      service.provisionDNS(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('dns body is required'));
    });

    it('should fail when calling service fails', () => {
      const request = requestFactory.toProvisionDNSRequest('CLOUD', 'console-server', {
        '.YP.CA': 'console',
        '.PJ.CA': 'console'
      });

      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      service.provisionDNS(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });
});
