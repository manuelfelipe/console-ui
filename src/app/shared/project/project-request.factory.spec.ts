import { TestBed } from '@angular/core/testing';
import { ProjectRequestFactory } from './project-request.factory';
import { BaseRequest } from '../base-service/base-request';

describe('ProjectRequestFactory Tests', () => {
  let requestFactory: ProjectRequestFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectRequestFactory,
      ],
    });
  });

  beforeEach(() => {
    requestFactory = new ProjectRequestFactory();
  });

  it('should be instantiable', () => {
    expect(requestFactory).toBeDefined();
  });

  describe('toGetProjectByNamespaceRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          namespace: null,
        }
      };

      const request = requestFactory.toGetProjectByNamespaceRequest(null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          namespace: 'NAMESPACE',
        }
      };

      const request = requestFactory.toGetProjectByNamespaceRequest('NAMESPACE');
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toSearchProjectsRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          query: null,
        }
      };

      const request = requestFactory.toSearchProjectsRequest(null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return null values when undefined is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          query: null,
        }
      };

      const request = requestFactory.toSearchProjectsRequest(undefined);
      expect(request).toEqual(EXPECTED);
    });

    it('should return null values when empty string is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          query: null,
        }
      };

      const request = requestFactory.toSearchProjectsRequest('');
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          query: 'ProjectName',
        }
      };

      const request = requestFactory.toSearchProjectsRequest('ProjectName');
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct encoded values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          query: 'CLOUD%2Fconsole-server',
        }
      };

      const request = requestFactory.toSearchProjectsRequest('CLOUD/console-server');
      expect(request).toEqual(EXPECTED);
    });
  });
});
