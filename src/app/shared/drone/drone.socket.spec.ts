import { ConnectionBackend, Http, HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { WrappedSocket } from 'ng-socket-io/socket-io.service';
import { SOCKET_MOCK_PROVIDER } from 'testing/mocks/socket.mock';
import { DroneSocketService } from './drone.socket';
import { Log } from './log/log';
import { LOGS_RESPONSE } from './log/logs.data';
import { EVENTS } from '../base-service/event-request';
import Spy = jasmine.Spy;

describe('DroneSocketService tests', () => {
  let service: DroneSocketService;
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
        DroneSocketService,
        Http,
        {
          provide: ConnectionBackend,
          useClass: MockBackend,
        },
      ],
    });
  });

  beforeEach(() => {
    service = TestBed.get(DroneSocketService);

    socket = TestBed.get(WrappedSocket);
    socketEmitSpy = spyOn(socket, 'emit');
    socketFromEventSpy = spyOn(socket, 'fromEvent');

    backend = TestBed.get(ConnectionBackend);
    http = TestBed.get(Http);
  });

  it('should be instantiable', () => {
    expect(service).toBeDefined();
  });

  describe('streamBuildFeed', () => {
    it('should fail when `owner` param is missing', () => {
      service.streamBuildFeed(null, 'NAME', 12)
        .subscribe(() => {
          fail();
        }, error => {
          expect(error).toBe('owner param is required');
          expect(socketFromEventSpy).not.toHaveBeenCalled();
        });
    });

    it('should fail when `name` param is missing', () => {
      service.streamBuildFeed('OWNER', null, 12)
        .subscribe(() => {
          fail();
        }, error => {
          expect(error).toBe('name param is required');
          expect(socketFromEventSpy).not.toHaveBeenCalled();
        });
    });

    it('should fail when `number` param is missing', () => {
      service.streamBuildFeed('OWNER', 'NAME', null)
        .subscribe(() => {
          fail();
        }, error => {
          expect(error).toBe('number param is required');
          expect(socketFromEventSpy).not.toHaveBeenCalled();
        });
    });

    it('should fail when calling service fails', () => {
      socketFromEventSpy.and.returnValue(Observable.throw('error with connection'));

      service.streamBuildLogs('OWNER', 'NAME', 1, 2)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('error with connection'));
    });

    it('should emit owner, name, number, job, and return log, with number as zero', () => {
      socketFromEventSpy.and.returnValue(Observable.of<Log>(LOGS_RESPONSE[0]));

      service.streamBuildFeed('OWNER', 'NAME', 0)
        .subscribe(log => {
          expect(log).toBe(LOGS_RESPONSE[0]);
          expect(socketFromEventSpy).toHaveBeenCalledWith('DRONE_BUILD_FEED_OWNER_NAME_0');
          expect(socketEmitSpy).toHaveBeenCalledWith(EVENTS.DRONE_BUILD_FEED_REQUEST, {
            owner: 'OWNER',
            name: 'NAME',
            number: 0,
          });
        }, error => fail(error));
    });

    it('should emit owner, name, number, job, and return log', () => {
      socketFromEventSpy.and.returnValue(Observable.of<Log>(LOGS_RESPONSE[0]));

      service.streamBuildFeed('OWNER', 'NAME', 12)
        .subscribe(log => {
          expect(log).toBe(LOGS_RESPONSE[0]);
          expect(socketFromEventSpy).toHaveBeenCalledWith('DRONE_BUILD_FEED_OWNER_NAME_12');
          expect(socketEmitSpy).toHaveBeenCalledWith(EVENTS.DRONE_BUILD_FEED_REQUEST, {
            owner: 'OWNER',
            name: 'NAME',
            number: 12
          });
        }, error => fail(error));
    });
  });

  describe('streamBuildLogs', () => {
    it('should fail when `owner` param is missing', () => {
      service.streamBuildLogs(null, 'NAME', 1, 2)
        .subscribe(() => {
          fail();
        }, error => {
          expect(error).toBe('owner param is required');
          expect(socketFromEventSpy).not.toHaveBeenCalled();
        });
    });

    it('should fail when `name` param is missing', () => {
      service.streamBuildLogs('OWNER', null, 1, 2)
        .subscribe(() => {
          fail();
        }, error => {
          expect(error).toBe('name param is required');
          expect(socketFromEventSpy).not.toHaveBeenCalled();
        });
    });

    it('should fail when `number` param is missing', () => {
      service.streamBuildLogs('OWNER', 'NAME', null, 2)
        .subscribe(() => {
          fail();
        }, error => {
          expect(error).toBe('number param is required');
          expect(socketFromEventSpy).not.toHaveBeenCalled();
        });
    });

    it('should fail when `job` param is missing', () => {
      service.streamBuildLogs('OWNER', 'NAME', 1, null)
        .subscribe(() => {
          fail();
        }, error => {
          expect(error).toBe('job param is required');
          expect(socketFromEventSpy).not.toHaveBeenCalled();
        });
    });

    it('should fail when calling service fails', () => {
      socketFromEventSpy.and.returnValue(Observable.throw('error with connection'));

      service.streamBuildLogs('OWNER', 'NAME', 1, 2)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('error with connection'));
    });

    it('should emit owner, name, number, job, and return log, with number/job as zeros', () => {
      socketFromEventSpy.and.returnValue(Observable.of<Log>(LOGS_RESPONSE[0]));

      service.streamBuildLogs('OWNER', 'NAME', 0, 0)
        .subscribe(log => {
          expect(log).toBe(LOGS_RESPONSE[0]);
          expect(socketFromEventSpy).toHaveBeenCalledWith('DRONE_BUILD_LOGS_OWNER_NAME_0_0');
          expect(socketEmitSpy).toHaveBeenCalledWith(EVENTS.DRONE_BUILD_LOGS_REQUEST, {
            owner: 'OWNER',
            name: 'NAME',
            number: 0,
            job: 0,
          });
        }, error => fail(error));
    });

    it('should emit owner, name, number, job, and return log', () => {
      socketFromEventSpy.and.returnValue(Observable.of<Log>(LOGS_RESPONSE[0]));

      service.streamBuildLogs('OWNER', 'NAME', 1, 2)
        .subscribe(log => {
          expect(log).toBe(LOGS_RESPONSE[0]);
          expect(socketFromEventSpy).toHaveBeenCalledWith('DRONE_BUILD_LOGS_OWNER_NAME_1_2');
          expect(socketEmitSpy).toHaveBeenCalledWith(EVENTS.DRONE_BUILD_LOGS_REQUEST, {
            owner: 'OWNER',
            name: 'NAME',
            number: 1,
            job: 2,
          });
        }, error => fail(error));
    });
  });
});
