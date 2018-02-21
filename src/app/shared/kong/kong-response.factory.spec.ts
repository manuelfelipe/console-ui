import { TestBed } from '@angular/core/testing';
import { RequestMethod } from '@angular/http';
import { KongResponseFactory } from './kong-response.factory';
import { Api } from './api/api';
import { Consumer } from './consumer/consumer';
import { Plugin } from './plugin/plugin';
import { KONG_APIS } from './api/apis.data';
import { KONG_CONSUMERS } from './consumer/consumers.data';
import { KONG_PLUGINS } from './plugin/plugins.data';
import { Schema, SchemaFieldType } from './plugin/schema';
import { KONG_PLUGIN_SCHEMA } from './plugin/schemas.data';
import { ConsumerPluginConfig } from './consumer-plugin-config/consumer-plugin-config';
import { KONG_CONSUMER_PLUGIN_CONFIGS } from './consumer-plugin-config/consumer-plugin-configs.data';

describe('KongResponseFactory Tests', () => {
  let responseFactory: KongResponseFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        KongResponseFactory,
      ],
    });
  });

  beforeEach(() => {
    responseFactory = new KongResponseFactory();
  });

  it('should be instantiable', () => {
    expect(responseFactory).toBeDefined();
  });

  describe('toApi', () => {
    it('should return null when null is passed', () => {
      const response = responseFactory.toApi(null);
      expect(response).toBeNull();
    });

    it('should return correct response', () => {
      const EXPECTED: Api = {
        id: '6378122c-a0a1-438d-a5c6-efabae9fb969',
        name: 'example-api',
        createdAt: new Date(1488830759000),
        hosts: ['example.org'],
        uris: ['/health'],
        methods: [RequestMethod.Get, RequestMethod.Post, RequestMethod.Put, RequestMethod.Patch, RequestMethod.Delete],
        upstreamUrl: 'http://httpbin.org'
      };

      const response = responseFactory.toApi(KONG_APIS[0]);
      expect(response).toEqual(EXPECTED);
    });
  });

  describe('toApis', () => {
    it('should return empty array when null is passed', () => {
      const response = responseFactory.toApis(null);
      expect(response).toEqual([]);
    });

    it('should return correct response', () => {
      const EXPECTED: Api[] = [
        {
          id: '6378122c-a0a1-438d-a5c6-efabae9fb969',
          name: 'example-api',
          createdAt: new Date(1488830759000),
          hosts: ['example.org'],
          uris: ['/health'],
          methods: [RequestMethod.Get, RequestMethod.Post, RequestMethod.Put, RequestMethod.Patch, RequestMethod.Delete],
          upstreamUrl: 'http://httpbin.org'
        },
        {
          id: '0924978e-eb19-44a0-9adc-55f20db2f04d',
          name: 'my-api',
          createdAt: new Date(1488830708000),
          hosts: ['api.com'],
          uris: ['/apis'],
          methods: [RequestMethod.Get, RequestMethod.Post, RequestMethod.Put, RequestMethod.Patch, RequestMethod.Delete],
          upstreamUrl: 'http://my-api.com'
        }
      ];

      const response = responseFactory.toApis(KONG_APIS);
      expect(response).toEqual(EXPECTED);
    });
  });

  describe('toConsumer', () => {
    it('should return null when null is passed', () => {
      const response = responseFactory.toConsumer(null);
      expect(response).toBeNull();
    });

    it('should return correct response', () => {
      const EXPECTED: Consumer = {
        id: '4d924084-1adb-40a5-c042-63b19db421d1',
        username: 'default@console-server-develop',
        customId: 'abc123',
        createdAt: new Date(1422386534)
      };

      const response = responseFactory.toConsumer(KONG_CONSUMERS[0]);
      expect(response).toEqual(EXPECTED);
    });
  });

  describe('toConsumers', () => {
    it('should return null when null is passed', () => {
      const response = responseFactory.toConsumers(null);
      expect(response).toEqual([]);
    });

    it('should return correct response', () => {
      const EXPECTED: Consumer[] = [
        {
          id: '4d924084-1adb-40a5-c042-63b19db421d1',
          username: 'default@console-server-develop',
          customId: 'abc123',
          createdAt: new Date(1422386534)
        },
        {
          id: '3f924084-1adb-40a5-c042-63b19db421a2',
          username: 'user@console-develop',
          customId: 'def345',
          createdAt: new Date(1422386585)
        }
      ];

      const response = responseFactory.toConsumers(KONG_CONSUMERS);
      expect(response).toEqual(EXPECTED);
    });
  });

  describe('toConsumerPluginConfig', () => {
    it('should return null when null is passed', () => {
      const response = responseFactory.toConsumerPluginConfig(null);
      expect(response).toBeNull();
    });

    it('should return correct response', () => {
      const EXPECTED: ConsumerPluginConfig = {
        id: '4d924084-1adb-40a5-c042-63b19db421d1',
        consumerId: 'abc123',
        createdAt: new Date(1422386534),
        username: 'Aladdin',
        password: 'OpenSesame'
      };

      const response = responseFactory.toConsumerPluginConfig(KONG_CONSUMER_PLUGIN_CONFIGS[0]);
      expect(response).toEqual(EXPECTED);
    });
  });

  describe('toConsumerPluginConfigs', () => {
    it('should return null when null is passed', () => {
      const response = responseFactory.toConsumerPluginConfigs(null);
      expect(response).toEqual([]);
    });

    it('should return correct response', () => {
      const EXPECTED: ConsumerPluginConfig[] = [
        {
          id: '4d924084-1adb-40a5-c042-63b19db421d1',
          consumerId: 'abc123',
          createdAt: new Date(1422386534),
          username: 'Aladdin',
          password: 'OpenSesame',
        },
        {
          id: '3f924084-1adb-40a5-c042-63b19db421a2',
          consumerId: 'def345',
          createdAt: new Date(1422386585),
          username: 'Biologie',
          password: '81070613',
        }
      ];

      const response = responseFactory.toConsumerPluginConfigs(KONG_CONSUMER_PLUGIN_CONFIGS);
      expect(response).toEqual(EXPECTED);
    });
  });

  describe('toPlugin', () => {
    it('should return null when null is passed', () => {
      const response = responseFactory.toPlugin(null);
      expect(response).toBeNull();
    });

    it('should return correct response', () => {
      const EXPECTED: Plugin = {
        id: '4d924084-1adb-40a5-c042-63b19db421d1',
        apiId: '5fd1z584-1adb-40a5-c042-63b19db49x21',
        consumerId: undefined,
        name: 'rate-limiting',
        config: {
          minute: 20,
          hour: 500,
          fake_regex_field: {}
        },
        enabled: true,
        createdAt: new Date(1422386534)
      };

      const response = responseFactory.toPlugin(KONG_PLUGINS[0]);
      expect(response).toEqual(EXPECTED);
    });
  });

  describe('toPlugins', () => {
    it('should return null when null is passed', () => {
      const response = responseFactory.toPlugins(null);
      expect(response).toEqual([]);
    });

    it('should return correct response', () => {
      const EXPECTED: Plugin[] = [
        {
          id: '4d924084-1adb-40a5-c042-63b19db421d1',
          apiId: '5fd1z584-1adb-40a5-c042-63b19db49x21',
          consumerId: undefined,
          name: 'rate-limiting',
          config: {
            minute: 20,
            hour: 500,
            fake_regex_field: {}
          },
          enabled: true,
          createdAt: new Date(1422386534)
        },
        {
          id: '3f924084-1adb-40a5-c042-63b19db421a2',
          apiId: '5fd1z584-1adb-40a5-c042-63b19db49x21',
          consumerId: 'a3dX2dh2-1adb-40a5-c042-63b19dbx83hF4',
          name: 'acl',
          config: {
            whitelist: ['thecloud'],
            blacklist: []
          },
          enabled: true,
          createdAt: new Date(1422386585)
        }
      ];

      const response = responseFactory.toPlugins(KONG_PLUGINS);
      expect(response).toEqual(EXPECTED);
    });
  });

  describe('toSchema', () => {
    it('should return null when null is passed', () => {
      const response = responseFactory.toSchema(null);
      expect(response).toBeNull();
    });

    it('should return correct response', () => {
      const EXPECTED: Schema = {
        fields: {
          limit_by: {
            type: SchemaFieldType.string,
            enum: [
              'consumer',
              'credential',
              'ip'
            ],
            default: 'consumer'
          },
          policy: {
            type: SchemaFieldType.string,
            enum: [
              'local',
              'cluster',
              'redis'
            ],
            default: 'cluster'
          },
          redis_database: {
            type: SchemaFieldType.number,
            default: 0
          },
          hour: {
            type: SchemaFieldType.number,
          },
          month: {
            type: SchemaFieldType.number,
          },
          redis_port: {
            type: SchemaFieldType.number,
            default: 6379
          },
          day: {
            type: SchemaFieldType.number,
          },
          minute: {
            type: SchemaFieldType.number,
          },
          second: {
            type: SchemaFieldType.number,
          },
          redis_host: {
            type: SchemaFieldType.string,
          },
          redis_timeout: {
            type: SchemaFieldType.number,
            default: 2000
          },
          redis_password: {
            type: SchemaFieldType.string,
          },
          fault_tolerant: {
            type: SchemaFieldType.boolean,
            default: true
          },
          year: {
            type: SchemaFieldType.number,
          },
          fake_regex_field: {
            type: SchemaFieldType.string,
            required: true,
            regex: new RegExp('/^reg$/')
          }
        },
        noConsumer: false,
        description: undefined,
      };

      const response = responseFactory.toSchema(KONG_PLUGIN_SCHEMA);
      expect(response).toEqual(EXPECTED);
    });
  });
})
;
