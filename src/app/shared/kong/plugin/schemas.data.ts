import { SchemaResponse } from './schema-response';

export const KONG_PLUGIN_SCHEMA: SchemaResponse = {
  fields: {
    limit_by: {
      type: 'string',
      enum: [
        'consumer',
        'credential',
        'ip'
      ],
      default: 'consumer'
    },
    policy: {
      type: 'string',
      enum: [
        'local',
        'cluster',
        'redis'
      ],
      default: 'cluster'
    },
    redis_database: {
      type: 'number',
      default: 0
    },
    hour: {
      type: 'number'
    },
    month: {
      type: 'number'
    },
    redis_port: {
      type: 'number',
      default: 6379
    },
    day: {
      type: 'number'
    },
    minute: {
      type: 'number'
    },
    second: {
      type: 'number'
    },
    redis_host: {
      type: 'string'
    },
    redis_timeout: {
      type: 'number',
      default: 2000
    },
    redis_password: {
      type: 'string'
    },
    fault_tolerant: {
      type: 'boolean',
      default: true
    },
    year: {
      type: 'number'
    },
    fake_regex_field: {
      type: 'string',
      required: true,
      regex: '/^reg$/'
    },
  },
  self_check: 'function'
};
