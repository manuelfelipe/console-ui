import { ConnectionBackend, Http, HttpModule, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ConfigService } from '../config/config.service';
import { BitbucketService } from './bitbucket.service';
import { BitbucketRequestFactory } from './bitbucket-request.factory';

describe('BitbucketService tests', () => {
  let service: BitbucketService;
  let requestFactory: BitbucketRequestFactory;
  let configService: ConfigService;
  let backend: MockBackend;
  let http: Http;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [],
      providers: [
        ConfigService,
        BitbucketService,
        BitbucketRequestFactory,
        Http,
        {
          provide: ConnectionBackend,
          useClass: MockBackend,
        },
      ],
    });
  });

  beforeEach(() => {
    service = TestBed.get(BitbucketService);
    requestFactory = TestBed.get(BitbucketRequestFactory);
    configService = TestBed.get(ConfigService);
    backend = TestBed.get(ConnectionBackend);
    http = TestBed.get(Http);
  });

  it('should be instantiable', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should fail when calling service fails', () => {
      const windowOpenSpy = spyOn(window, 'open');

      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      service.login();
      expect(windowOpenSpy).not.toHaveBeenCalled();
    });

    it('should redirect to authorizationUrl', () => {
      const EXPECTED_URL = `/auth/bitbucket/authorizationUrl?callback=${window.location.origin}/loginCallback`;
      const EXPECTED_METHOD: RequestMethod = RequestMethod.Get;

      const windowOpenSpy = spyOn(window, 'open');

      let url = null;
      let method = null;

      backend.connections.subscribe((connection: MockConnection) => {
        url = connection.request.url;
        method = connection.request.method;

        const options = new ResponseOptions({
          body: JSON.stringify({
            result: true,
            data: 'authorizationUrl',
          }),
        });
        connection.mockRespond(new Response(options));
      });

      service.login();

      expect(url).toContain(EXPECTED_URL);
      expect(method).toBe(EXPECTED_METHOD);
      expect(windowOpenSpy).toHaveBeenCalledWith('authorizationUrl', '_self');
    });
  });

  describe('getProfile', () => {
    it('should fail when input is null', () => {
      service.getProfile(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when oauth_token is null', () => {
      const request = requestFactory.toGetProfileRequest(null, 'oauth_verifier');

      service.getProfile(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('oauth_token queryParam is required'));
    });

    it('should fail when oauth_verifier is null', () => {
      const request = requestFactory.toGetProfileRequest('oauth_token', null);

      service.getProfile(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('oauth_verifier queryParam is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetProfileRequest('oauth_token', 'oauth_verifier');

      service.getProfile(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
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

  describe('getProjectRepos', () => {
    it('should fail when input is null', () => {
      service.getProjectRepos(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when project is null', () => {
      const request = requestFactory.toGetProjectReposRequest(null);

      service.getProjectRepos(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('project param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetProjectReposRequest('PROJECT');

      service.getProjectRepos(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

});
