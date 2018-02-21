import { ConnectionBackend, Http, HttpModule } from '@angular/http';
import { TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ConfigService } from '../config/config.service';
import { DroneService } from './drone.service';
import { DroneRequestFactory } from './drone-request.factory';

describe('DroneService tests', () => {
  let service: DroneService;
  let requestFactory: DroneRequestFactory;
  let configService: ConfigService;
  let backend: MockBackend;
  let http: Http;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [],
      providers: [
        ConfigService,
        DroneService,
        DroneRequestFactory,
        Http,
        {
          provide: ConnectionBackend,
          useClass: MockBackend,
        },
      ],
    });
  });

  beforeEach(() => {
    service = TestBed.get(DroneService);
    requestFactory = TestBed.get(DroneRequestFactory);
    configService = TestBed.get(ConfigService);
    backend = TestBed.get(ConnectionBackend);
    http = TestBed.get(Http);
  });

  it('should be instantiable', () => {
    expect(service).toBeDefined();
  });

  describe('getDeploymentsCount', () => {
    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      service.getDeploymentsCount()
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('getBuilds', () => {
    it('should fail when input param is missing', () => {
      service.getBuilds(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when `owner` param is missing', () => {
      const request = requestFactory.toGetBuildsRequest(null, 'name');

      service.getBuilds(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('owner param is required'));
    });

    it('should fail when `name` param is missing', () => {
      const request = requestFactory.toGetBuildsRequest('owner', null);

      service.getBuilds(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('name param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetBuildsRequest('owner', 'name');
      service.getBuilds(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('getContributors', () => {
    it('should fail when input param is missing', () => {
      service.getContributors(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when `owner` param is missing', () => {
      const request = requestFactory.toGetContributorsRequest(null, 'name');

      service.getContributors(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('owner param is required'));
    });

    it('should fail when `name` param is missing', () => {
      const request = requestFactory.toGetContributorsRequest('owner', null);

      service.getContributors(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('name param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetContributorsRequest('owner', 'name');
      service.getContributors(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('getBuild', () => {
    it('should fail when input param is missing', () => {
      service.getBuild(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when `owner` param is missing', () => {
      const request = requestFactory.toGetBuildRequest(null, 'name', 777);

      service.getBuild(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('owner param is required'));
    });

    it('should fail when `name` param is missing', () => {
      const request = requestFactory.toGetBuildRequest('owner', null, 777);

      service.getBuild(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('name param is required'));
    });

    it('should fail when `number` param is missing', () => {
      const request = requestFactory.toGetBuildRequest('owner', 'name', null);

      service.getBuild(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('number param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetBuildRequest('owner', 'name', 777);
      service.getBuild(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('getLatestBuild', () => {
    it('should fail when input param is missing', () => {
      service.getLatestBuild(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when `owner` param is missing', () => {
      const request = requestFactory.toGetBuildsRequest(null, 'name');

      service.getLatestBuild(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('owner param is required'));
    });

    it('should fail when `name` param is missing', () => {
      const request = requestFactory.toGetBuildsRequest('owner', null);

      service.getLatestBuild(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('name param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetBuildsRequest('owner', 'name');
      service.getLatestBuild(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('restartBuild', () => {
    it('should fail when input param is missing', () => {
      service.restartBuild(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when `owner` param is missing', () => {
      const request = requestFactory.toRestartBuildRequest(null, 'name', 12);

      service.restartBuild(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('owner param is required'));
    });

    it('should fail when `name` param is missing', () => {
      const request = requestFactory.toRestartBuildRequest('owner', null, 12);

      service.restartBuild(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('name param is required'));
    });

    it('should fail when `number` param is missing', () => {
      const request = requestFactory.toRestartBuildRequest('owner', 'name', null);

      service.restartBuild(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('number param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toRestartBuildRequest('owner', 'name', 12);
      service.restartBuild(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('stopBuild', () => {
    it('should fail when input param is missing', () => {
      service.stopBuild(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when `owner` param is missing', () => {
      const request = requestFactory.toStopBuildRequest(null, 'name', 777, 1);

      service.stopBuild(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('owner param is required'));
    });

    it('should fail when `name` param is missing', () => {
      const request = requestFactory.toStopBuildRequest('owner', null, 777, 1);

      service.stopBuild(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('name param is required'));
    });

    it('should fail when `number` param is missing', () => {
      const request = requestFactory.toStopBuildRequest('owner', 'name', null, 1);

      service.stopBuild(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('number param is required'));
    });

    it('should fail when `job` param is missing', () => {
      const request = requestFactory.toStopBuildRequest('owner', 'name', 777, null);

      service.stopBuild(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('job param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toStopBuildRequest('owner', 'name', 777, 1);
      service.stopBuild(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('getBuildLogs', () => {
    it('should fail when input param is missing', () => {
      service.getBuildLogs(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when `owner` param is missing', () => {
      const request = requestFactory.toGetBuildLogsRequest(null, 'name', 777, 1);

      service.getBuildLogs(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('owner param is required'));
    });

    it('should fail when `name` param is missing', () => {
      const request = requestFactory.toGetBuildLogsRequest('owner', null, 777, 1);

      service.getBuildLogs(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('name param is required'));
    });

    it('should fail when `number` param is missing', () => {
      const request = requestFactory.toGetBuildLogsRequest('owner', 'name', null, 1);

      service.getBuildLogs(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('number param is required'));
    });

    it('should fail when `job` param is missing', () => {
      const request = requestFactory.toGetBuildLogsRequest('owner', 'name', 777, null);

      service.getBuildLogs(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('job param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetBuildLogsRequest('owner', 'name', 777, 1);
      service.getBuildLogs(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });
});
