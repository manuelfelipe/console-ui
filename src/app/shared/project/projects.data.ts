import { ProjectResponse } from './project-response';

export const PROJECTS_RESPONSE: ProjectResponse[] = [
  {
    _id: '591b5b6ff960b0c03f95e6ca',
    __v: 0,
    name: 'YPID/ypid-proxy',
    createdAt: '2017-05-17T13:36:54.392Z',
    isDeleted: false,
    repository: {
      name: 'ypid-proxy',
      owner: 'YPID'
    },
    namespaces: [
      {
        _id: '591c51c0f426bcaa7cb41337',
        name: 'ypidypid-proxy',
        clusters: [
          'aws'
        ]
      },
      {
        _id: '591c51c0f426bcaa7cb41336',
        name: 'ypidypid-proxy-develop',
        clusters: [
          'aws'
        ]
      },
      {
        _id: '591c51c0f426bcaa7cb41335',
        name: 'ypidypid-proxy-qa',
        clusters: [
          'aws'
        ]
      }
    ]
  },
  {
    _id: '591c5365f960b0c03fa113ff',
    __v: 0,
    name: 'YPID/users',
    createdAt: '2017-05-17T13:43:10.672Z',
    isDeleted: false,
    repository: {
      name: 'users',
      owner: 'YPID'
    },
    namespaces: [
      {
        _id: '591c536562801bacebc685b7',
        name: 'ypidusers',
        clusters: [
          'aws'
        ]
      },
      {
        _id: '591c536562801bacebc685b6',
        name: 'ypidusers-qa',
        clusters: [
          'aws'
        ]
      }
    ]
  },
  {
    _id: '591c5365f960b0c03fa112fb',
    __v: 0,
    name: 'CLOUD/console-ui',
    createdAt: '2017-05-17T13:43:10.714Z',
    isDeleted: false,
    repository: {
      name: 'console-ui',
      owner: 'CLOUD'
    },
    namespaces: [
      {
        _id: '591c536562801bacebc684d0',
        name: 'console',
        clusters: [
          'aws'
        ]
      }
    ]
  },
];
