import { Event } from './event';

export const PUBSUB_EVENTS: Event[] = [
  {
    who: {
      name: 'Mark Massoud',
      username: 'mmassou1',
      email: 'mark.massoud@yp.ca',
    },
    project: {
      owner: 'CLOUD',
      repo: 'console-server',
    },
    where: 'console',
    what: 'aws.console-server-pod-id-81070613',
    namespace: 'console-server',
    type: 'terminated',
    source: 'DELETE /kubernetes/clusters/aws/namespaces/console-server/pods/console-server-pod-id-81070613',
    description: 'Mark Massoud terminated a pod',
    timestamp: '2017-04-12T19:45:18.768Z',
  },
  {
    who: {
      name: 'Manuel Correa',
      username: 'mcorre1',
      email: 'manuel.coreea@yp.ca',
    },
    project: {
      owner: 'CLOUD',
      repo: 'console-server',
    },
    where: 'console',
    what: 'aws.console-server-pod-id-81070613',
    namespace: 'console-server',
    type: 'terminated',
    source: 'DELETE /kubernetes/clusters/aws/namespaces/console-server/pods/console-server-pod-id-81070613',
    description: 'Mark Massoud terminated a pod',
    timestamp: '2017-04-13T19:45:18.768Z',
  },
  {
    who: {
      name: 'Yamen Bakr',
      username: 'ybakr1',
      email: 'yamen.bakr@yp.ca',
    },
    project: {
      owner: 'CLOUD',
      repo: 'console-server',
    },
    where: 'console',
    what: 'aws.console-server-pod-id-81070613',
    namespace: 'console-server',
    type: 'terminated',
    source: 'DELETE /kubernetes/clusters/aws/namespaces/console-server/pods/console-server-pod-id-81070613',
    description: 'Mark Massoud terminated a pod',
    timestamp: '2017-04-14T19:45:18.768Z',
  },
  {
    who: {
      name: 'Mark Massoud',
      username: 'mmassou1',
      email: 'mark.massoud@yp.ca',
    },
    project: {
      owner: 'CLOUD',
      repo: 'console-ui',
    },
    where: 'console',
    what: 'aws.console-server-pod-id-81070613',
    namespace: 'console-develop',
    type: 'terminated',
    source: 'DELETE /kubernetes/clusters/aws/namespaces/console-server/pods/console-server-pod-id-81070613',
    description: 'Mark Massoud terminated a pod',
    timestamp: '2017-04-15T19:45:18.768Z',
  },
];
