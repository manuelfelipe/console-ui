import { TestBed } from '@angular/core/testing';
import { BaseRequest } from '../base-service/base-request';
import { SwaggerRequestFactory } from './swagger-request.factory';

describe('SwaggerRequestFactory Tests', () => {
  let requestFactory: SwaggerRequestFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SwaggerRequestFactory,
      ],
    });
  });

  beforeEach(() => {
    requestFactory = new SwaggerRequestFactory();
  });

  it('should be instantiable', () => {
    expect(requestFactory).toBeDefined();
  });

  describe('toGetSwaggerFileRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          namespace: null,
        }
      };

      const request = requestFactory.toGetSwaggerFileRequest(null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          namespace: 'console-server',
        }
      };

      const request = requestFactory.toGetSwaggerFileRequest('console-server');
      expect(request).toEqual(EXPECTED);
    });
  });
});
