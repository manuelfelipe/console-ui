import { ConnectionBackend, Http, HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { WrappedSocket } from 'ng-socket-io/socket-io.service';
import { EventSocketService } from './event.socket';
import { EVENTS } from '../base-service/event-request';
import { SOCKET_MOCK_PROVIDER } from 'testing/mocks/socket.mock';
import { PUBSUB_EVENTS } from './events.data';
import Spy = jasmine.Spy;

describe('EventSocketService tests', () => {
  let service: EventSocketService;
  let socket: WrappedSocket;
  let backend: MockBackend;
  let http: Http;

  let socketEmitSpy: Spy;
  let socketFromEventSpy: Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [],
      providers: [
        SOCKET_MOCK_PROVIDER,
        EventSocketService,
        Http,
        {
          provide: ConnectionBackend,
          useClass: MockBackend,
        },
      ],
    });
  });

  beforeEach(() => {
    service = TestBed.get(EventSocketService);

    socket = TestBed.get(WrappedSocket);
    socketEmitSpy = spyOn(service, 'emit');
    socketFromEventSpy = spyOn(service, 'fromEvent');

    backend = TestBed.get(ConnectionBackend);
    http = TestBed.get(Http);
  });

  it('should be instantiable', () => {
    expect(service).toBeDefined();
  });

  describe('watchActivities', () => {
    it('should fail when calling service fails', () => {
      socketFromEventSpy.and.returnValue(Observable.throw('error with connection'));

      service.watchActivities()
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('error with connection'));
    });

    it('should emit with ALL if no namespace provided', () => {
      socketFromEventSpy.and.returnValue(Observable.of(PUBSUB_EVENTS[0]));

      service.watchActivities()
        .subscribe(event => {
          expect(event).toEqual(PUBSUB_EVENTS[0]);
          expect(socketFromEventSpy).toHaveBeenCalledWith('PUBSUB_EVENTS_ALL');
          expect(socketEmitSpy).toHaveBeenCalledWith(EVENTS.PUBSUB_EVENTS_REQUEST, {
            namespace: 'ALL',
          });
        }, error => fail(error));
    });

    it('should emit namespace, and return activity event', () => {
      socketFromEventSpy.and.returnValue(Observable.of(PUBSUB_EVENTS[0]));

      service.watchActivities('console-server')
        .subscribe(event => {
          expect(event).toEqual(PUBSUB_EVENTS[0]);
          expect(socketFromEventSpy).toHaveBeenCalledWith('PUBSUB_EVENTS_console-server');
          expect(socketEmitSpy).toHaveBeenCalledWith(EVENTS.PUBSUB_EVENTS_REQUEST, {
            namespace: 'console-server',
          });
        }, error => fail(error));
    });
  });

});
