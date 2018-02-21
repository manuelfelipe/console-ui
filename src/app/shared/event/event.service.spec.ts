import { ConnectionBackend, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { EventService } from './event.service';
import { ConfigService } from '../config/config.service';
import { EventRequestFactory } from './event-request.factory';

describe('EventService tests', () => {
  let service: EventService;
  let requestFactory: EventRequestFactory;
  let configService: ConfigService;
  let backend: MockBackend;
  let http: Http;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [],
      providers: [
        ConfigService,
        EventService,
        EventRequestFactory,
        Http,
        {
          provide: ConnectionBackend,
          useClass: MockBackend,
        },
      ],
    });
  });

  beforeEach(() => {
    service = TestBed.get(EventService);
    requestFactory = TestBed.get(EventRequestFactory);
    configService = TestBed.get(ConfigService);
    backend = TestBed.get(ConnectionBackend);
    http = TestBed.get(Http);
  });

  it('should be instantiable', () => {
    expect(service).toBeDefined();
  });

  describe('getEvents', () => {
    it('should fail when input param is missing', () => {
      service.getEvents(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should not fail when `namespace` queryParam, or any other, are missing', (done) => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: {
            result: true,
            body: [],
          }
        })));
      });

      const request = requestFactory.toGetEventsRequest(null, null, null, null);
      service.getEvents(request)
        .subscribe(() => {
          done();
        }, (error) => {
          console.log('ERROR', error);
          fail();
        });
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetEventsRequest('NAMESPACE', 'USER', '2017-04-12', '2017-06-27');
      service.getEvents(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

});
