import { Observable } from 'rxjs/Observable';
import { BaseRequest } from '../base-service/base-request';
import { KubernetesService } from './kubernetes.service';
import { Deployment } from './deployment/deployment';
import { DeploymentResponse } from './deployment/deployment-response';
import { PodResponse } from './pod/pod-response';
import { EventResponse } from './event/event-response';
import { LabelsResponse } from './labels/labels-response';

class KubernetesServiceMock {

  getNamespaceDeployments(request: BaseRequest): Observable<Deployment[]> {
    throw new Error('KubernetesServiceMock.getNamespaceDeployments unimplemented');
  }

  getNamespaceEvents(request: BaseRequest): Observable<EventResponse> {
    throw new Error('KubernetesServiceMock.getNamespaceEvents unimplemented');
  }

  getNamespaceKibanaTrafficDashboardURL(request: BaseRequest): Observable<String> {
    throw new Error('KubernetesServiceMock.getNamespaceKibanaTrafficDashboardURL unimplemented');
  }

  getNamespaceLabels(request: BaseRequest): Observable<LabelsResponse> {
    throw new Error('KubernetesServiceMock.getNamespaceLabels unimplemented');
  }

  getServiceURL(request: BaseRequest): Observable<String> {
    throw new Error('KubernetesServiceMock.getServiceURL unimplemented');
  }

  getServiceUpstreamURL(request: BaseRequest): Observable<String> {
    throw new Error('KubernetesServiceMock.getServiceUpstreamURL unimplemented');
  }

  getServiceConfigMaps(request: BaseRequest): Observable<any> {
    throw new Error('KubernetesServiceMock.getServiceConfigMaps unimplemented');
  }

  getServiceHealth(request: BaseRequest): Observable<Boolean> {
    throw new Error('KubernetesServiceMock.getServiceHealth unimplemented');
  }

  getDeploymentPods(request: BaseRequest): Observable<PodResponse[]> {
    throw new Error('KubernetesServiceMock.getDeploymentPods unimplemented');
  }

  patchDeploymentScale(request: BaseRequest): Observable<DeploymentResponse> {
    throw new Error('KubernetesServiceMock.patchDeploymentScale unimplemented');
  }

  getPodLogs(request: BaseRequest): Observable<string[]> {
    throw new Error('KubernetesServiceMock.getPodLogs unimplemented');
  }

  deletePod(request: BaseRequest): Observable<any> {
    throw new Error('KubernetesServiceMock.deletePod unimplemented');
  }
}

export const KUBERNETES_SERVICE_MOCK_PROVIDER = {
  provide: KubernetesService,
  useClass: KubernetesServiceMock,
};
