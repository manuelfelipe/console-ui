import { TestBed } from '@angular/core/testing';
import { ProvisionsRequestFactory } from './provisions-request.factory';
import { BaseRequest } from '../base-service/base-request';
import { ProvisionAppType } from '../../application/self-service/provisions/provision-app/provision-app-type';
import { ProvisionAppLanguage } from '../../application/self-service/provisions/provision-app/provision-app-language';

describe('ProvisionsRequestFactory Tests', () => {
  let requestFactory: ProvisionsRequestFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProvisionsRequestFactory,
      ],
    });
  });

  beforeEach(() => {
    requestFactory = new ProvisionsRequestFactory();
  });

  it('should be instantiable', () => {
    expect(requestFactory).toBeDefined();
  });

  describe('toInitNewProjectRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          owner: null,
          repo: null,
        },
        body: {
          configs: {},
        }
      };

      const request = requestFactory.toInitNewProjectRequest(null, null, null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct empty values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          owner: 'CLOUD',
          repo: 'console-server',
        },
        body: {
          configs: {},
        }
      };

      const request = requestFactory.toInitNewProjectRequest('CLOUD', 'console-server', {});
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct processed values', () => {
      const configs = {
        app: {
          enableConfig: true
        },
        db: {
          type: 'Mongo'
        },
        dns: {
          '.YP.CA': 'avocat'
        }
      };

      const EXPECTED: BaseRequest = {
        params: {
          owner: 'CLOUD',
          repo: 'console-server',
        },
        body: {
          configs: {
            app: {
              enableConfig: true
            },
            mongo: {},
            dns: {
              names: ['avocat.yp.ca']
            }
          },
        }
      };

      const request = requestFactory.toInitNewProjectRequest('CLOUD', 'console-server', configs);
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toProvisionAppRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          owner: null,
          repo: null,
        },
        body: {
          service: 'app',
          config: {
            language: undefined,
            type: undefined,
          }
        }
      };

      const request = requestFactory.toProvisionAppRequest(null, null, null, null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          owner: 'CLOUD',
          repo: 'console-server',
        },
        body: {
          service: 'app',
          config: {
            language: 'NodeJS',
            type: 'UI',
          }
        }
      };

      const request = requestFactory.toProvisionAppRequest('CLOUD', 'console-server', ProvisionAppLanguage.NodeJS, ProvisionAppType.UI);
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toProvisionDBRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          owner: null,
          repo: null,
        },
        body: {
          service: null,
          config: {}
        }
      };

      const request = requestFactory.toProvisionDBRequest(null, null, null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          owner: 'CLOUD',
          repo: 'console-server',
        },
        body: {
          service: 'mongodb',
          config: {}
        }
      };

      const request = requestFactory.toProvisionDBRequest('CLOUD', 'console-server', 'mongodb');
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toCheckDNSRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        queryParams: {
          dns: null,
          type: null,
        },
      };

      const request = requestFactory.toCheckDNSRequest(null, null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        queryParams: {
          dns: 'avocat',
          type: 'pj.ca',
        },
      };

      const request = requestFactory.toCheckDNSRequest('avocat', 'pj.ca');
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toProvisionDNSRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        params: {
          owner: null,
          repo: null,
        },
        body: {
          service: 'dns',
          config: {
            names: []
          }
        }
      };

      const request = requestFactory.toProvisionDNSRequest(null, null, null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          owner: 'CLOUD',
          repo: 'console-server',
        },
        body: {
          service: 'dns',
          config: {
            names: ['console.yp.ca', 'console.pj.ca']
          },
        }
      };

      const request = requestFactory.toProvisionDNSRequest('CLOUD', 'console-server', {
        '.YP.CA': 'console',
        '.PJ.CA': 'console'
      });

      expect(request).toEqual(EXPECTED);
    });
  });
});
