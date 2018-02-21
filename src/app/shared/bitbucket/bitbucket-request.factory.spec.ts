import { TestBed } from '@angular/core/testing';
import { BaseRequest } from '../base-service/base-request';
import { BitbucketRequestFactory } from './bitbucket-request.factory';

describe('BitbucketRequestFactory Tests', () => {
  let requestFactory: BitbucketRequestFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BitbucketRequestFactory,
      ],
    });
  });

  beforeEach(() => {
    requestFactory = TestBed.get(BitbucketRequestFactory);
  });

  it('should be instantiable', () => {
    expect(requestFactory).toBeDefined();
  });

  describe('toGetAuthorizationUrlRequest', () => {
    it('should return nulls when nulls are passed', () => {
      const EXPECTED: BaseRequest = {
        queryParams: {
          callback: null,
        },
      };

      const request = requestFactory.toGetAuthorizationUrlRequest(null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct request', () => {
      const EXPECTED: BaseRequest = {
        queryParams: {
          callback: 'http://localhost:4200',
        },
      };

      const request = requestFactory.toGetAuthorizationUrlRequest('http://localhost:4200');
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toGetProfileRequest', () => {
    it('should return nulls when nulls are passed', () => {
      const EXPECTED: BaseRequest = {
        queryParams: {
          oauth_token: null,
          oauth_verifier: null,
        },
      };

      const request = requestFactory.toGetProfileRequest(null, null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct request', () => {
      const EXPECTED: BaseRequest = {
        queryParams: {
          oauth_token: 'oauth_token',
          oauth_verifier: 'oauth_verifier',
        },
      };

      const request = requestFactory.toGetProfileRequest('oauth_token', 'oauth_verifier');
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toGetProjectReposRequest', () => {
    it('should return nulls when nulls are passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          project: null,
        },
        queryParams: {
          inactiveOnly: false,
        }
      };

      const request = requestFactory.toGetProjectReposRequest(null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct request', () => {
      const EXPECTED: BaseRequest = {
        params: {
          project: 'PROJECT',
        },
        queryParams: {
          inactiveOnly: true,
        }
      };

      const request = requestFactory.toGetProjectReposRequest('PROJECT', true);
      expect(request).toEqual(EXPECTED);
    });
  });
});
