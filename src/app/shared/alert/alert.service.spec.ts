import { ConnectionBackend, Http, HttpModule } from '@angular/http';
import { TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AlertService } from './alert.service';
import { ConfigService } from '../config/config.service';

describe('AlertService tests', () => {
  let service: AlertService;
  let configService: ConfigService;
  let backend: MockBackend;
  let http: Http;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [],
      providers: [
        ConfigService,
        AlertService,
        Http,
        {
          provide: ConnectionBackend,
          useClass: MockBackend,
        },
      ],
    });
  });

  beforeEach(() => {
    service = TestBed.get(AlertService);
    configService = TestBed.get(ConfigService);
    backend = TestBed.get(ConnectionBackend);
    http = TestBed.get(Http);
  });

  it('should be instantiable', () => {
    expect(service).toBeDefined();
  });

  describe('getAlerts', () => {
    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      service.getAlerts()
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

});
