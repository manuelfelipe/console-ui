import { TestBed } from '@angular/core/testing';
import { BaseRequest } from '../base-service/base-request';
import { KongRequestFactory } from './kong-request.factory';

describe('KongRequestFactory Tests', () => {
  let requestFactory: KongRequestFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        KongRequestFactory,
      ],
    });
  });

  beforeEach(() => {
    requestFactory = new KongRequestFactory();
  });

  it('should be instantiable', () => {
    expect(requestFactory).toBeDefined();
  });

  describe('toGetConsumersRequest', () => {
    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        queryParams: {
          username: 'USERNAME',
        }
      };

      const request = requestFactory.toGetConsumersRequest('USERNAME');
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toGetConsumerByUsernameRequest', () => {
    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          username: 'USERNAME',
        }
      };

      const request = requestFactory.toGetConsumerByUsernameRequest('USERNAME');
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toGetConsumersByNamespaceRequest', () => {
    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          namespace: 'NAMESPACE',
        }
      };

      const request = requestFactory.toGetConsumersByNamespaceRequest('NAMESPACE');
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toGetConsumerPluginConfigRequest', () => {
    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          username: 'USERNAME',
          pluginName: 'PLUGIN_NAME',
        }
      };

      const request = requestFactory.toGetConsumerPluginConfigRequest('USERNAME', 'PLUGIN_NAME');
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toCreateConsumerPluginConfigRequest', () => {
    it('should drop nil config values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          username: 'USERNAME',
          pluginName: 'PLUGIN_NAME',
        },
        body: {
          namespace: 'NAMESPACE',
          config: {
            username: 'USERNAME',
          }
        }
      };

      const config = {
        username: 'USERNAME',
        password: null,
        token: undefined,
        key: '',
      };

      const request = requestFactory.toCreateConsumerPluginConfigRequest('USERNAME', 'PLUGIN_NAME', 'NAMESPACE', config);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          username: 'USERNAME',
          pluginName: 'PLUGIN_NAME',
        },
        body: {
          namespace: 'NAMESPACE',
          config: {
            username: 'USERNAME',
            password: 'PASSWORD',
          }
        }
      };

      const config = {
        username: 'USERNAME',
        password: 'PASSWORD',
      };

      const request = requestFactory.toCreateConsumerPluginConfigRequest('USERNAME', 'PLUGIN_NAME', 'NAMESPACE', config);
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toDeleteConsumerPluginConfigRequest', () => {
    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          username: 'USERNAME',
          pluginName: 'PLUGIN_NAME',
          configId: 'CONFIG_ID'
        }
      };

      const request = requestFactory.toDeleteConsumerPluginConfigRequest('USERNAME', 'PLUGIN_NAME', 'CONFIG_ID');
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toCreateConsumerRequest', () => {
    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        body: {
          username: 'USERNAME',
        }
      };

      const request = requestFactory.toCreateConsumerRequest('USERNAME');
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toDeleteConsumerRequest', () => {
    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          username: 'USERNAME',
        }
      };

      const request = requestFactory.toDeleteConsumerRequest('USERNAME');
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toGetPluginByIdRequest', () => {
    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          id: 'ID',
        }
      };

      const request = requestFactory.toGetPluginByIdRequest('ID');
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toAddApiPluginRequest', () => {
    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          id: 'API_ID',
        },
        body: {
          name: 'NAME',
          config: {
            anonymous: true,
          },
        }
      };

      const request = requestFactory.toAddApiPluginRequest('API_ID', 'NAME', { anonymous: true });
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toUpdateApiPluginRequest', () => {
    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          id: 'API_ID',
        },
        body: {
          id: 'PLUGIN_ID',
          name: 'NAME',
          config: {
            anonymous: true,
          },
          enabled: true,
        }
      };

      const request = requestFactory.toUpdateApiPluginRequest('API_ID', 'PLUGIN_ID', 'NAME', { anonymous: true }, true);
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toGetPluginSchemaRequest', () => {
    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          name: 'NAME',
        }
      };

      const request = requestFactory.toGetPluginSchemaRequest('NAME');
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toGetApiByIdRequest', () => {
    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          id: 'ID',
        }
      };

      const request = requestFactory.toGetApiByIdRequest('ID');
      expect(request).toEqual(EXPECTED);
    });
  });

  describe('toGetApiPluginsRequest', () => {
    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        params: {
          id: 'ID',
        }
      };

      const request = requestFactory.toGetApiPluginsRequest('ID');
      expect(request).toEqual(EXPECTED);
    });
  });
});
