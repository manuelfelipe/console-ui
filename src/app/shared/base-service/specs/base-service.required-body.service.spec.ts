import { ConnectionBackend, Http, HttpModule, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ConfigService } from '../../config/config.service';
import { BaseRequest } from '../base-request';
import { BaseTestService } from './base-test.service';

describe('Base Service tests', () => {
  let service: BaseTestService;
  let configService: ConfigService;
  let backend: MockBackend;
  let http: Http;

  describe('requiredBody', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpModule],
        declarations: [],
        providers: [
          ConfigService,
          BaseTestService,
          Http,
          {
            provide: ConnectionBackend,
            useClass: MockBackend,
          },
        ],
      });
    });

    beforeEach(() => {
      service = TestBed.get(BaseTestService);
      configService = TestBed.get(ConfigService);
      backend = TestBed.get(ConnectionBackend);
      http = TestBed.get(Http);
    });

    it('should be instantiable', () => {
      expect(service).toBeDefined();
    });

    it('should throw error if request is null', () => {
      service.requiredBody(null)
        .subscribe(
          () => fail(),
          error => {
            expect(error).toBe('input is required');
          });
    });

    it('should throw error if request is missing body data', () => {
      service.requiredBody({})
        .subscribe(
          () => fail(),
          error => {
            expect(error).toBe('data body is required');
          });
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request: BaseRequest = {
        body: {
          data: 'Data',
        },
      };

      service.requiredBody(request)
        .subscribe(() => fail(),
          err => {
            expect(err.message).toBe('error with connection');
          });
    });

    it('should return error message if webservice returns status false', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({
          body: JSON.stringify({
            result: false,
            errors: null,
          }),
        });
        connection.mockRespond(new Response(options));
      });

      const request: BaseRequest = {
        body: {
          data: 'Data',
        },
      };

      service.requiredBody(request)
        .subscribe(
          res => {
            fail(res);
          },
          err => expect(err).toBe('request failed with response status: false'));
    });

    it('should call HTTP with the correct options', () => {
      const EXPECTED_URL = 'baseTestServiceUrl/path';
      const EXPECTED_METHOD: RequestMethod = RequestMethod.Post;
      const EXPECTED_BODY: any = {
        data: 'Data',
      };

      let url;
      let method;
      let body;

      backend.connections.subscribe((connection: MockConnection) => {
        url = connection.request.url;
        method = connection.request.method;
        body = JSON.parse(connection.request.getBody());

        const options = new ResponseOptions({
          body: JSON.stringify({
            result: true,
            data: 'data',
          }),
        });
        connection.mockRespond(new Response(options));
      });

      const request: BaseRequest = {
        body: {
          data: 'Data',
        },
      };

      service.requiredBody(request)
        .subscribe(
          res => {
            expect(res).toBe('data');
            expect(url).toContain(EXPECTED_URL);
            expect(method).toBe(EXPECTED_METHOD);
            expect(body).toEqual(EXPECTED_BODY);
          },
          err => fail(err));
    });

    it('should call HTTP with the correct options, if body is 0', () => {
      const EXPECTED_URL = 'baseTestServiceUrl/path';
      const EXPECTED_METHOD: RequestMethod = RequestMethod.Post;
      const EXPECTED_BODY: any = {
        data: 0,
      };

      let url;
      let method;
      let body;

      backend.connections.subscribe((connection: MockConnection) => {
        url = connection.request.url;
        method = connection.request.method;
        body = JSON.parse(connection.request.getBody());

        const options = new ResponseOptions({
          body: JSON.stringify({
            result: true,
            data: 'data',
          }),
        });
        connection.mockRespond(new Response(options));
      });

      const request: BaseRequest = {
        body: {
          data: 0,
        },
      };

      service.requiredBody(request)
        .subscribe(
          res => {
            expect(res).toBe('data');
            expect(url).toContain(EXPECTED_URL);
            expect(method).toBe(EXPECTED_METHOD);
            expect(body).toEqual(EXPECTED_BODY);
          },
          err => fail(err));
    });

    it('should call HTTP with the correct options, if body is `0`', () => {
      const EXPECTED_URL = 'baseTestServiceUrl/path';
      const EXPECTED_METHOD: RequestMethod = RequestMethod.Post;
      const EXPECTED_BODY: any = {
        data: 0,
      };

      let url;
      let method;
      let body;

      backend.connections.subscribe((connection: MockConnection) => {
        url = connection.request.url;
        method = connection.request.method;
        body = JSON.parse(connection.request.getBody());

        const options = new ResponseOptions({
          body: JSON.stringify({
            result: true,
            data: 'data',
          }),
        });
        connection.mockRespond(new Response(options));
      });

      const request: BaseRequest = {
        body: {
          data: 0,
        },
      };

      service.requiredBody(request)
        .subscribe(
          res => {
            expect(res).toBe('data');
            expect(url).toContain(EXPECTED_URL);
            expect(method).toBe(EXPECTED_METHOD);
            expect(body).toEqual(EXPECTED_BODY);
          },
          err => fail(err));
    });
  });
});
