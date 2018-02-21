import { TestBed } from '@angular/core/testing';
import { BaseRequest } from '../base-service/base-request';
import { ConsulRequestFactory } from './consul-request.factory';

describe('ConsulRequestFactory Tests', () => {
  let requestFactory: ConsulRequestFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConsulRequestFactory,
      ],
    });
  });

  beforeEach(() => {
    requestFactory = new ConsulRequestFactory();
  });

  it('should be instantiable', () => {
    expect(requestFactory).toBeDefined();
  });

  describe('toGetKeysRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          key: null,
        }
      };

      const request = requestFactory.toGetKeysRequest(null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          key: 'KEY',
        }
      };

      const request = requestFactory.toGetKeysRequest('KEY');
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toGetValuesRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          key: null,
        }
      };

      const request = requestFactory.toGetValuesRequest(null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          key: 'KEY',
        }
      };

      const request = requestFactory.toGetValuesRequest('KEY');
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toSetConfigRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          key: null,
        },
        body: {
          config: null,
        },
      };

      const request = requestFactory.toSetConfigRequest(null, null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          key: 'CONFIG_KEY',
        },
        body: {
          config: {
            key: 'value'
          },
        },
      };

      const request = requestFactory.toSetConfigRequest('CONFIG_KEY', { key: 'value' });
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toDeleteConfigRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          key: null,
        }
      };

      const request = requestFactory.toDeleteConfigRequest(null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          key: 'KEY',
        }
      };

      const request = requestFactory.toDeleteConfigRequest('KEY');
      expect(request).toEqual(EXPECTED);
    });
  });

});
