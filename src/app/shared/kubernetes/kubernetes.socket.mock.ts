import { Observable } from 'rxjs/Observable';
import { KubernetesSocketService } from './kubernetes.socket';
import { WatchEvent } from './watch-event/watch-event';
import { PodResponse } from './pod/pod-response';
import { EventResponse } from './event/event-response';

class KubernetesSocketServiceMock {

  watchDeploymentPods(cluster: string, namespace: string, deployment: string): Observable<WatchEvent<PodResponse>> {
    throw new Error('KubernetesSocketServiceMock.watchDeploymentPods unimplemented');
  }

  watchNamespaceEvents(cluster: string, namespace: string): Observable<WatchEvent<EventResponse>> {
    throw new Error('KubernetesSocketServiceMock.watchNamespaceEvents unimplemented');
  }

  streamPodLogs(cluster: string, namespace: string, pod: string): Observable<string> {
    throw new Error('KubernetesSocketServiceMock.streamPodLogs unimplemented');
  }

}

export const KUBERNETES_SOCKET_SERVICE_MOCK_PROVIDER = {
  provide: KubernetesSocketService,
  useClass: KubernetesSocketServiceMock,
};
