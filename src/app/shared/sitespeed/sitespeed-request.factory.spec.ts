import { TestBed } from '@angular/core/testing';
import { BaseRequest } from '../base-service/base-request';
import { SiteSpeedRequestFactory } from './sitespeed-request.factory';

describe('SiteSpeedRequestFactory Tests', () => {
  let requestFactory: SiteSpeedRequestFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SiteSpeedRequestFactory,
      ],
    });
  });

  beforeEach(() => {
    requestFactory = new SiteSpeedRequestFactory();
  });

  it('should be instantiable', () => {
    expect(requestFactory).toBeDefined();
  });

  describe('toCreateCronJobRequest', () => {
    it('should return null values if passed nulls', () => {
      const EXPECTED: BaseRequest = {
        body: {
          name: null,
          schedule: null,
          urls: null,
          args: null,
        }
      };

      const request = requestFactory.toCreateCronJobRequest(null, null, null, null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        body: {
          name: 'CronJobName',
          schedule: '* * * * *',
          urls: ['yp.ca'],
          args: ['-b', 'chrome'],
        }
      };

      const request = requestFactory.toCreateCronJobRequest('CronJobName', '* * * * *', ['yp.ca'], ['-b', 'chrome']);
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toUpdateCronJobRequest', () => {
    it('should return null values if passed nulls', () => {
      const EXPECTED: BaseRequest = {
        params: {
          name: null,
        },
        body: {
          schedule: null,
          urls: null,
          args: null,
        }
      };

      const request = requestFactory.toUpdateCronJobRequest(null, null, null, null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          name: 'CronJobName',
        },
        body: {
          schedule: '* * * * *',
          urls: ['yp.ca'],
          args: ['-b', 'chrome'],
        }
      };

      const request = requestFactory.toUpdateCronJobRequest('CronJobName', '* * * * *', ['yp.ca'], ['-b', 'chrome']);
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toDeleteCronJobRequest', () => {
    it('should return null values if passed nulls', () => {
      const EXPECTED: BaseRequest = {
        params: {
          name: null,
        }
      };

      const request = requestFactory.toDeleteCronJobRequest(null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          name: 'CronJobName',
        }
      };

      const request = requestFactory.toDeleteCronJobRequest('CronJobName');
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toGetCronJobReportsRequest', () => {
    it('should return null values if passed nulls', () => {
      const EXPECTED: BaseRequest = {
        params: {
          name: null,
        }
      };

      const request = requestFactory.toGetCronJobReportsRequest(null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          name: 'CronJobName',
        }
      };

      const request = requestFactory.toGetCronJobReportsRequest('CronJobName');
      expect(request).toEqual(EXPECTED);
    });
  });

});
