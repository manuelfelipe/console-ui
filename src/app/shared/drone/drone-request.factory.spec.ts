import { TestBed } from '@angular/core/testing';
import { DroneRequestFactory } from './drone-request.factory';
import { BaseRequest } from '../base-service/base-request';

describe('DroneRequestFactory Tests', () => {
  let requestFactory: DroneRequestFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DroneRequestFactory,
      ],
    });
  });

  beforeEach(() => {
    requestFactory = new DroneRequestFactory();
  });

  it('should be instantiable', () => {
    expect(requestFactory).toBeDefined();
  });

  describe('toGetBuildsRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          owner: null,
          name: null,
        }
      };

      const request = requestFactory.toGetBuildsRequest(null, null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          owner: 'OWNER',
          name: 'NAME',
        }
      };

      const request = requestFactory.toGetBuildsRequest('OWNER', 'NAME');
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toGetContributorsRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          owner: null,
          name: null,
        }
      };

      const request = requestFactory.toGetContributorsRequest(null, null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          owner: 'OWNER',
          name: 'NAME',
        }
      };

      const request = requestFactory.toGetContributorsRequest('OWNER', 'NAME');
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toGetBuildRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          owner: null,
          name: null,
          number: null,
        }
      };

      const request = requestFactory.toGetBuildRequest(null, null, null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          owner: 'OWNER',
          name: 'NAME',
          number: 777,
        }
      };

      const request = requestFactory.toGetBuildRequest('OWNER', 'NAME', 777);
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toGetLatestBuildRequest', () => {
    it('should return null values when null is passed, and default to `master` branch', () => {
      const EXPECTED: BaseRequest = {
        params: {
          owner: null,
          name: null,
        },
        queryParams: {
          branch: 'master',
        },
      };

      const request = requestFactory.toGetLatestBuildRequest(null, null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct', () => {
      const EXPECTED: BaseRequest = {
        params: {
          owner: 'OWNER',
          name: 'NAME',
        },
        queryParams: {
          branch: 'develop',
        },
      };

      const request = requestFactory.toGetLatestBuildRequest('OWNER', 'NAME', 'develop');
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toRestartBuildRequest', () => {
    it('should return null values when null is passed, and default to `master` branch', () => {
      const EXPECTED: BaseRequest = {
        params: {
          owner: null,
          name: null,
          number: null,
        },
      };

      const request = requestFactory.toRestartBuildRequest(null, null, null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct', () => {
      const EXPECTED: BaseRequest = {
        params: {
          owner: 'OWNER',
          name: 'NAME',
          number: 12,
        },
      };

      const request = requestFactory.toRestartBuildRequest('OWNER', 'NAME', 12);
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toStopBuildRequest', () => {
    it('should return null values when null is passed, and default to `master` branch', () => {
      const EXPECTED: BaseRequest = {
        params: {
          owner: null,
          name: null,
          number: null,
          job: null,
        },
      };

      const request = requestFactory.toStopBuildRequest(null, null, null, null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct', () => {
      const EXPECTED: BaseRequest = {
        params: {
          owner: 'OWNER',
          name: 'NAME',
          number: 1,
          job: 2,
        },
      };

      const request = requestFactory.toStopBuildRequest('OWNER', 'NAME', 1, 2);
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toGetBuildLogsRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          owner: null,
          name: null,
          number: null,
          job: null,
        }
      };

      const request = requestFactory.toGetBuildLogsRequest(null, null, null, null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct', () => {
      const EXPECTED: BaseRequest = {
        params: {
          owner: 'OWNER',
          name: 'NAME',
          number: 777,
          job: 1,
        }
      };

      const request = requestFactory.toGetBuildLogsRequest('OWNER', 'NAME', 777, 1);
      expect(request).toEqual(EXPECTED);
    });
  });

});
