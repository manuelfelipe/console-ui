import { APICatalogEntry } from './api-catalog-entry';

export const API_CATALOG_ENTRIES: APICatalogEntry[] = [
  {
    '@timestamp': '2017-11-14T15:20:10.986Z',
    repo: {
      owner: 'DAA',
      name: 'sem-service'
    },
    namespace: 'daasem-service-develop',
    serviceGroup: 'daa',
    serviceName: 'sem',
    spec: `{ swagger: 2.0 }`,
  },
  {
    '@timestamp': '2017-11-14T15:19:22.719Z',
    repo: {
      owner: 'CLOUD',
      name: 'uptime'
    },
    namespace: 'clouduptime-develop',
    serviceGroup: 'cloud',
    serviceName: 'uptime',
    spec: `{ swagger: 2.0 }`,
  },
  {
    '@timestamp': '2017-11-14T15:19:23.454Z',
    repo: {
      owner: 'CLOUD',
      name: 'ypc-configmixer-svc'
    },
    namespace: 'cloudypc-configmixer-svc-develop',
    serviceGroup: 'cloud',
    serviceName: 'config',
    spec: `{ swagger: 2.0 }`,
  }
];
