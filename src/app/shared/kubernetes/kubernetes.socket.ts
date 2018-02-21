import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';
import { WatchEvent, WatchEventType } from './watch-event/watch-event';
import { WatchEventResponse } from './watch-event/watch-event-response';
import { PodResponse } from './pod/pod-response';
import { EventResponse } from './event/event-response';
import { EVENTS } from '../base-service/event-request';
import { environment } from '../../../environments/environment';

@Injectable()
export class KubernetesSocketService extends Socket {

  constructor() {
    super({
      url: environment.socket.baseUrl,
      options: {
        path: environment.socket.path,
        query: {
          token: localStorage.getItem('thecloud.token')
        }
      }
    });
  }

  watchDeploymentPods(cluster: string, namespace: string, deployment: string): Observable<WatchEvent<PodResponse>> {
    if (!cluster) {
      return Observable.throw('cluster param is required');
    }

    if (!namespace) {
      return Observable.throw('namespace param is required');
    }

    if (!deployment) {
      return Observable.throw('deployment param is required');
    }

    this.emit(EVENTS.KUBERNETES_NAMESPACE_DEPLOYMENTS_REQUEST, {
      cluster,
      namespace,
      deployment,
    });

    return this.fromEvent<WatchEventResponse<PodResponse>>(`KUBERNETES_DEPLOYMENT_PODS_${cluster}_${namespace}_${deployment}`)
      .map(eventResponse => ({
        type: WatchEventType[eventResponse.type],
        data: eventResponse.data,
      }));
  }

  watchNamespaceEvents(cluster: string, namespace: string): Observable<WatchEvent<EventResponse>> {
    if (!cluster) {
      return Observable.throw('cluster param is required');
    }

    if (!namespace) {
      return Observable.throw('namespace param is required');
    }

    this.emit(EVENTS.KUBERNETES_EVENTS_REQUEST, {
      cluster,
      namespace,
    });

    return this.fromEvent<WatchEventResponse<EventResponse>>(`KUBERNETES_EVENTS_${cluster}_${namespace}`)
      .map(eventResponse => ({
        type: WatchEventType[eventResponse.type],
        data: eventResponse.data,
      }));
  }

  streamPodLogs(cluster: string, namespace: string, pod: string, container: string): Observable<string> {
    if (!cluster) {
      return Observable.throw('cluster param is required');
    }

    if (!namespace) {
      return Observable.throw('namespace param is required');
    }

    if (!pod) {
      return Observable.throw('pod param is required');
    }

    if (!container) {
      return Observable.throw('container param is required');
    }

    this.emit(EVENTS.KUBERNETES_POD_LOGS_REQUEST, {
      cluster,
      namespace,
      pod,
      container,
    });

    return this.fromEvent<string>(`KUBERNETES_POD_LOGS_${cluster}_${namespace}_${pod}_${container}`);
  }
}
