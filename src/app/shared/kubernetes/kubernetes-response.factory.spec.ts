import { TestBed } from '@angular/core/testing';
import { KubernetesResponseFactory } from './kubernetes-response.factory';
import { Namespace } from './namespace/namespace';
import { Deployment } from './deployment/deployment';
import { KUBERNETES_NAMESPACES } from './namespace/namespaces.data';
import { KUBERNETES_DEPLOYMENTS } from './deployment/deployments.data';
import { Pod } from './pod/pod';
import { PodStatus } from './pod/pod-status';
import { KUBERNETES_PODS } from './pod/pods.data';
import { Event, EventType } from './event/event';
import { KUBERNETES_EVENTS } from './event/events.data';
import { Labels } from './labels/labels';
import { KUBERNETES_LABELS } from './labels/labels.data';
import { ContainerState } from './pod/container-state';
import { KUBERNETES_CRONJOBS } from './cronjob/cronjobs.data';
import { CronJob } from './cronjob/cronjob';

describe('KubernetesResponseFactory Tests', () => {
  let responseFactory: KubernetesResponseFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        KubernetesResponseFactory,
      ],
    });
  });

  beforeEach(() => {
    responseFactory = new KubernetesResponseFactory();
  });

  it('should be instantiable', () => {
    expect(responseFactory).toBeDefined();
  });

  describe('toNamespace', () => {
    it('should return null when null is passed', () => {
      const response = responseFactory.toNamespace(null);
      expect(response).toBeNull();
    });

    it('should return correct response, without annotations', () => {
      const EXPECTED: Namespace = {
        name: 'alch-test',
        uid: 'c9990eec-1cf6-11e6-a7c0-12ea718e4fbd',
        createdAt: new Date('2016-05-18T12:48:15Z'),
        status: 'Active'
      };

      const response = responseFactory.toNamespace(KUBERNETES_NAMESPACES[0]);
      expect(response).toEqual(EXPECTED);
    });

    it('should return correct response, with annotations', () => {
      const EXPECTED: Namespace = {
        name: 'ams',
        uid: '294fcebe-f48e-11e6-9201-126f8629c640',
        createdAt: new Date('2017-02-16T21:23:29Z'),
        annotations: {
          'drone/author': 'Jean-Philippe Ricard',
          'drone/build_number': 743,
          'drone/commit_branch': 'master',
          'drone/repo': 'SHARED-SERVICES/ams',
        },
        status: 'Active'
      };

      const response = responseFactory.toNamespace(KUBERNETES_NAMESPACES[1]);
      expect(response).toEqual(EXPECTED);
    });
  });

  describe('toNamespaces', () => {
    it('should return [] when null is passed', () => {
      const response = responseFactory.toNamespaces(null);
      expect(response).toEqual([]);
    });

    it('should return correct response', () => {
      const EXPECTED: Namespace[] = [
        {
          name: 'alch-test',
          uid: 'c9990eec-1cf6-11e6-a7c0-12ea718e4fbd',
          createdAt: new Date('2016-05-18T12:48:15Z'),
          status: 'Active'
        },
        {
          name: 'ams',
          uid: '294fcebe-f48e-11e6-9201-126f8629c640',
          createdAt: new Date('2017-02-16T21:23:29Z'),
          annotations: {
            'drone/author': 'Jean-Philippe Ricard',
            'drone/build_number': 743,
            'drone/commit_branch': 'master',
            'drone/repo': 'SHARED-SERVICES/ams',
          },
          status: 'Active'
        },
        {
          name: 'bc-account-mnt',
          uid: 'bd8b8ec4-ee42-11e6-84f0-0e8f2a52ea32',
          createdAt: new Date('2017-02-08T21:08:29Z'),
          annotations: {
            'drone/author': 'Karim Bouchouicha',
            'drone/build_number': 4,
            'drone/commit_branch': 'master',
            'drone/repo': 'BC/account-mgt-services',
          },
          status: 'Active'
        },
      ];

      const response = responseFactory.toNamespaces(KUBERNETES_NAMESPACES.slice(0, 3));
      expect(response).toEqual(EXPECTED);
    });
  });

  describe('toDeployment', () => {
    it('should return null when null is passed', () => {
      const response = responseFactory.toDeployment(null);
      expect(response).toBeNull();
    });

    it('should return correct response, without annotations', () => {
      const EXPECTED: Deployment = {
        name: 'status',
        namespace: 'status',
        image: 'registry.thecloud.io/thecloud-io/cloud/status:150',
        uid: '9725a0dd-f391-11e6-84f0-0e8f2a52ea32',
        createdAt: new Date('2017-02-15T15:15:31Z'),
        revisions: 25,
        replicas: 2,
        pods: [],
      };

      const response = responseFactory.toDeployment(KUBERNETES_DEPLOYMENTS[0]);
      expect(response).toEqual(EXPECTED);
    });
  });

  describe('toDeployments', () => {
    it('should return [] when null is passed', () => {
      const response = responseFactory.toDeployments(null);
      expect(response).toEqual([]);
    });

    it('should return correct response', () => {
      const EXPECTED: Deployment[] = [{
        name: 'status',
        namespace: 'status',
        image: 'registry.thecloud.io/thecloud-io/cloud/status:150',
        uid: '9725a0dd-f391-11e6-84f0-0e8f2a52ea32',
        createdAt: new Date('2017-02-15T15:15:31Z'),
        revisions: 25,
        replicas: 2,
        pods: [],
      }];

      const response = responseFactory.toDeployments(KUBERNETES_DEPLOYMENTS);
      expect(response).toEqual(EXPECTED);
    });
  });

  describe('toPod', () => {
    it('should return null when null is passed', () => {
      const response = responseFactory.toPod(null);
      expect(response).toBeNull();
    });

    it('should return correct response, without annotations', () => {
      const EXPECTED: Pod = {
        name: 'yp-shopwisegms-3926478594-1smsa',
        namespace: 'yp-shopwisegms',
        uid: '7e5498d6-4af7-11e7-9d9b-126f8629c640',
        createdAt: new Date('2017-06-06T20:34:09Z'),
        restartCount: 24,
        buildNumber: 497,
        status: PodStatus.Running,
        containers: [],
        containerState: ContainerState.running,
        lastState: {
          terminated: {
            exitCode: 137,
            reason: 'OOMKilled',
            startedAt: null,
            finishedAt: '2017-07-24T16:59:48Z',
          }
        },
      };

      const response = responseFactory.toPod(KUBERNETES_PODS[0]);
      expect(response).toEqual(EXPECTED);
    });
  });

  describe('toPods', () => {
    it('should return [] when null is passed', () => {
      const response = responseFactory.toPods(null);
      expect(response).toEqual([]);
    });

    it('should return correct response', () => {
      const EXPECTED: Pod[] = [{
        name: 'yp-shopwisegms-3926478594-1smsa',
        namespace: 'yp-shopwisegms',
        uid: '7e5498d6-4af7-11e7-9d9b-126f8629c640',
        createdAt: new Date('2017-06-06T20:34:09Z'),
        restartCount: 24,
        buildNumber: 497,
        status: PodStatus.Running,
        containers: [],
        containerState: ContainerState.running,
        lastState: {
          terminated: {
            exitCode: 137,
            reason: 'OOMKilled',
            startedAt: null,
            finishedAt: '2017-07-24T16:59:48Z',
          }
        },
      }];

      const response = responseFactory.toPods(KUBERNETES_PODS);
      expect(response).toEqual(EXPECTED);
    });
  });

  describe('toEvent', () => {
    it('should return null when null is passed', () => {
      const response = responseFactory.toEvent(null);
      expect(response).toBeNull();
    });

    it('should return correct response', () => {
      const EXPECTED: Event = {
        reason: 'FailedScheduling',
        message: 'No nodes are available that match all of the following predicates:: Insufficient cpu (1), MatchNodeSelector (15).',
        uid: '27a1f742-664f-11e7-bc47-0e140e5a62e6',
        creationTimestamp: new Date('2017-07-11T15:39:41Z'),
        firstTimestamp: new Date('2017-07-11T15:39:41Z'),
        lastTimestamp: new Date('2017-07-11T17:36:33Z'),
        count: 354,
        type: EventType.Warning,
      };

      const response = responseFactory.toEvent(KUBERNETES_EVENTS[0]);
      expect(response).toEqual(EXPECTED);
    });
  });

  describe('toEvents', () => {
    it('should return [] when null is passed', () => {
      const response = responseFactory.toEvents(null);
      expect(response).toEqual([]);
    });

    it('should return correct response', () => {
      const EXPECTED: Event[] = [{
        reason: 'FailedScheduling',
        message: 'No nodes are available that match all of the following predicates:: Insufficient cpu (1), MatchNodeSelector (15).',
        uid: '27a1f742-664f-11e7-bc47-0e140e5a62e6',
        creationTimestamp: new Date('2017-07-11T15:39:41Z'),
        firstTimestamp: new Date('2017-07-11T15:39:41Z'),
        lastTimestamp: new Date('2017-07-11T17:36:33Z'),
        count: 354,
        type: EventType.Warning,
      }, {
        reason: 'CREATE',
        message: 'status-develop/status-develop',
        uid: '70fefcd8-665f-11e7-98a4-0a488c45c1d2',
        creationTimestamp: new Date('2017-07-11T17:36:16Z'),
        firstTimestamp: new Date('2017-07-11T17:35:58Z'),
        lastTimestamp: new Date('2017-07-11T17:35:58Z'),
        count: 1,
        type: EventType.Normal,
      }];

      const response = responseFactory.toEvents(KUBERNETES_EVENTS);
      expect(response).toEqual(EXPECTED);
    });
  });

  describe('toLabels', () => {
    it('should return null when null is passed', () => {
      const response = responseFactory.toLabels(null);
      expect(response).toBeNull();
    });

    it('should return correct response', () => {
      const EXPECTED: Labels = {
        name: 'console-server',
        version: 'v1',
        group: 'cloud',
        env: 'dev'
      };

      const response = responseFactory.toLabels(KUBERNETES_LABELS);
      expect(response).toEqual(EXPECTED);
    });
  });

  describe('toCronJob', () => {
    it('should return null when null is passed', () => {
      const response = responseFactory.toCronJob(null);
      expect(response).toBeNull();
    });

    it('should return correct response, without annotations', () => {
      const EXPECTED: CronJob = {
        name: 'speed-yp-ca',
        uid: 'd3b0ed6d-af82-11e7-ab9c-42010af000ee',
        createdAt: new Date('2017-10-12T19:23:29Z'),
        username: 'mmassou1',
        schedule: '0/60 * * * ?',
        urls: [
          'https://www.yellowpages.ca/',
          'https://preprod-ui.yellowpages.ca/',
          'https://qa-ui-mtl.yellowpages.ca/',
        ],
        args: [
          'https://www.yellowpages.ca/',
          'https://preprod-ui.yellowpages.ca/',
          'https://qa-ui-mtl.yellowpages.ca/',
          '-b',
          'chrome',
          '--speedIndex',
          '--html.showAllWaterfallSummary'
        ],
      };

      const response = responseFactory.toCronJob(KUBERNETES_CRONJOBS[0]);
      expect(response).toEqual(EXPECTED);
    });
  });

  describe('toCronJobs', () => {
    it('should return empty array when null is passed', () => {
      const response = responseFactory.toCronJobs(null);
      expect(response).toEqual([]);
    });

    it('should return correct response', () => {
      const EXPECTED: CronJob[] = [{
        name: 'speed-yp-ca',
        uid: 'd3b0ed6d-af82-11e7-ab9c-42010af000ee',
        createdAt: new Date('2017-10-12T19:23:29Z'),
        username: 'mmassou1',
        schedule: '0/60 * * * ?',
        urls: [
          'https://www.yellowpages.ca/',
          'https://preprod-ui.yellowpages.ca/',
          'https://qa-ui-mtl.yellowpages.ca/',
        ],
        args: [
          'https://www.yellowpages.ca/',
          'https://preprod-ui.yellowpages.ca/',
          'https://qa-ui-mtl.yellowpages.ca/',
          '-b',
          'chrome',
          '--speedIndex',
          '--html.showAllWaterfallSummary'
        ],
      }];

      const response = responseFactory.toCronJobs(KUBERNETES_CRONJOBS);
      expect(response).toEqual(EXPECTED);
    });
  });
});
