import { ConnectionBackend, Http, HttpModule } from '@angular/http';
import { TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ConfigService } from '../config/config.service';
import { ProjectService } from './project.service';
import { ProjectRequestFactory } from './project-request.factory';

describe('ProjectService tests', () => {
  let service: ProjectService;
  let requestFactory: ProjectRequestFactory;
  let configService: ConfigService;
  let backend: MockBackend;
  let http: Http;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [],
      providers: [
        ConfigService,
        ProjectRequestFactory,
        ProjectService,
        Http,
        {
          provide: ConnectionBackend,
          useClass: MockBackend,
        },
      ],
    });
  });

  beforeEach(() => {
    service = TestBed.get(ProjectService);
    requestFactory = TestBed.get(ProjectRequestFactory);
    configService = TestBed.get(ConfigService);
    backend = TestBed.get(ConnectionBackend);
    http = TestBed.get(Http);
  });

  it('should be instantiable', () => {
    expect(service).toBeDefined();
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

  describe('getProjectByNamespace', () => {
    it('should fail when input param is missing', () => {
      service.getProjectByNamespace(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when `namespace` param is missing', () => {
      service.getProjectByNamespace({})
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('namespace param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetProjectByNamespaceRequest('projectName');

      service.getProjectByNamespace(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('searchProjects', () => {
    it('should fail when input param is missing', () => {
      service.searchProjects(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when `query` param is missing', () => {
      service.searchProjects({})
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('query param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toSearchProjectsRequest('projectName');

      service.searchProjects(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });
});
