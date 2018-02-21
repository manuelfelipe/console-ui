import { get, keys, omit, parseInt as _parseInt, sumBy } from 'lodash';
import { Namespace } from './namespace/namespace';
import { NamespaceResponse } from './namespace/namespace-response';
import { Deployment } from './deployment/deployment';
import { DeploymentResponse } from './deployment/deployment-response';
import { PodResponse } from './pod/pod-response';
import { Pod } from './pod/pod';
import { PodStatus } from './pod/pod-status';
import { Event, EventType } from './event/event';
import { EventResponse } from './event/event-response';
import { LabelsResponse } from './labels/labels-response';
import { Labels } from './labels/labels';
import { ContainerState } from './pod/container-state';
import { CronJobResponse } from './cronjob/cronjob-response';
import { CronJob } from './cronjob/cronjob';

export class KubernetesResponseFactory {
  toNamespace(namespaceResponse: NamespaceResponse): Namespace {
    if (!namespaceResponse) {
      return null;
    }

    const namespace = {
      name: namespaceResponse.metadata.name,
      uid: namespaceResponse.metadata.uid,
      createdAt: new Date(namespaceResponse.metadata.creationTimestamp),
      status: namespaceResponse.status.phase,
    };

    if (namespaceResponse.metadata.annotations) {
      namespace['annotations'] = {
        'drone/author': namespaceResponse.metadata.annotations['drone/author'],
        'drone/build_number': Number.parseInt(namespaceResponse.metadata.annotations['drone/build_number']),
        'drone/commit_branch': namespaceResponse.metadata.annotations['drone/commit_branch'],
        'drone/repo': namespaceResponse.metadata.annotations['drone/repo'],
      };
    }

    return namespace;
  };

  toNamespaces(namespaces: NamespaceResponse[]): Namespace[] {
    if (!namespaces) {
      return [];
    }

    return namespaces.map(namespace => this.toNamespace(namespace));
  };

  toDeployment(deploymentResponse: DeploymentResponse): Deployment {
    if (!deploymentResponse) {
      return null;
    }

    return {
      name: deploymentResponse.metadata.name,
      namespace: deploymentResponse.metadata.namespace,
      image: get(deploymentResponse, 'spec.template.spec.containers[0].image', '')
        .replace('gcr.io', 'registry.thecloud.io'),
      uid: deploymentResponse.metadata.uid,
      createdAt: new Date(deploymentResponse.metadata.creationTimestamp),
      revisions: +get(deploymentResponse, 'metadata.annotations[\'deployment.kubernetes.io/revision\']', 0),
      replicas: deploymentResponse.spec.replicas,
      pods: [],
    };
  };

  toDeployments(deployments: DeploymentResponse[]): Deployment[] {
    if (!deployments) {
      return [];
    }

    return deployments.map(deployment => this.toDeployment(deployment));
  };

  toPod(podResponse: PodResponse): Pod {
    if (!podResponse) {
      return null;
    }

    return {
      name: podResponse.metadata.name,
      namespace: podResponse.metadata.namespace,
      uid: podResponse.metadata.uid,
      createdAt: new Date(podResponse.metadata.creationTimestamp),
      buildNumber: this.parsePodBuildNumber(podResponse),
      restartCount: sumBy(podResponse.status.containerStatuses, 'restartCount'),
      status: PodStatus[podResponse.status.phase],
      containers: podResponse.spec.containers.map(container => container.name),
      containerState: ContainerState[keys(get(podResponse, 'status.containerStatuses[0].state', {}))[0]],
      lastState: omit(get(podResponse, 'status.containerStatuses[0].lastState'), 'terminated.containerID'),
    };
  };

  toPods(pods: PodResponse[]): Pod[] {
    if (!pods) {
      return [];
    }

    return pods.map(pod => this.toPod(pod));
  };

  toEvent(eventResponse: EventResponse): Event {
    if (!eventResponse) {
      return null;
    }

    return {
      reason: eventResponse.reason,
      message: eventResponse.message,
      uid: eventResponse.metadata.uid,
      creationTimestamp: new Date(eventResponse.metadata.creationTimestamp),
      firstTimestamp: new Date(eventResponse.firstTimestamp),
      lastTimestamp: new Date(eventResponse.lastTimestamp),
      count: eventResponse.count,
      type: EventType[eventResponse.type],
    };
  };

  toEvents(events: EventResponse[]): Event[] {
    if (!events) {
      return [];
    }

    return events.map(event => this.toEvent(event));
  };

  toLabels(labelsResponse: LabelsResponse): Labels {
    if (!labelsResponse) {
      return null;
    }

    return {
      name: labelsResponse['thecloud.io/service.name'],
      version: labelsResponse['thecloud.io/service.version'],
      group: labelsResponse['thecloud.io/service.group'],
      env: labelsResponse['thecloud.io/service.env'],
    };
  };

  toCronJob(cronJobResponse: CronJobResponse): CronJob {
    if (!cronJobResponse) {
      return null;
    }

    return {
      name: cronJobResponse.metadata.name,
      uid: cronJobResponse.metadata.uid,
      createdAt: new Date(cronJobResponse.metadata.creationTimestamp),
      username: get<string>(cronJobResponse, 'metadata.annotations.username'),
      schedule: get<string>(cronJobResponse, 'spec.schedule'),
      urls: get<string>(cronJobResponse, 'metadata.annotations.urls', '').split(','),
      args: get<string[]>(cronJobResponse, 'spec.jobTemplate.spec.template.spec.containers[0].args', []),
    };
  };

  toCronJobs(cronjobs: CronJobResponse[]): CronJob[] {
    if (!cronjobs) {
      return [];
    }

    return cronjobs.map(cronjob => this.toCronJob(cronjob));
  };

  private parsePodBuildNumber(podResponse: PodResponse): number {
    const buildNumberRegex = /(:\d+)$/; // ends with `:{number}`

    const image: string = get(podResponse, 'status.containerStatuses[0].image', '');
    const numberMatches: string[] = image.match(buildNumberRegex);

    if (numberMatches && numberMatches[0]) {
      // substring to remove first char `:`
      return _parseInt(numberMatches[0].substring(1));
    }

    return null;
  }
}
