import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../base-service/base.service';
import { BaseRequest } from '../base-service/base-request';
import { ConfigService } from '../config/config.service';
import { DeploymentResponse } from './deployment/deployment-response';
import { Endpoints } from '../base-service/endpoints';
import { PodResponse } from './pod/pod-response';
import { EventResponse } from './event/event-response';
import { LabelsResponse } from './labels/labels-response';

@Injectable()
export class KubernetesService extends BaseService {

  protected serviceDomainUrl: string = this.configService.getConfig('serviceBaseUrl');

  private ENDPOINTS: Endpoints = {
    getNamespaceDeployments: {
      method: 'get',
      path: '/kubernetes/namespaces/:namespace/deployments',
      requiredParams: ['namespace'],
    },
    getNamespaceEvents: {
      method: 'get',
      path: '/kubernetes/clusters/:cluster/namespaces/:namespace/events',
      requiredParams: ['cluster', 'namespace'],
    },
    getNamespaceKibanaTrafficDashboardURL: {
      method: 'get',
      path: '/kubernetes/namespaces/:namespace/kibana-traffic-url',
      requiredParams: ['namespace'],
    },
    getNamespaceLabels: {
      method: 'get',
      path: '/kubernetes/namespaces/:namespace/labels',
      requiredParams: ['namespace'],
    },
    getServiceURL: {
      method: 'get',
      path: '/kubernetes/namespaces/:namespace/service-url',
      requiredParams: ['namespace'],
    },
    getServiceUpstreamURL: {
      method: 'get',
      path: '/kubernetes/namespaces/:namespace/upstream-url',
      requiredParams: ['namespace'],
    },
    getServiceConfigMaps: {
      method: 'get',
      path: '/kubernetes/clusters/:cluster/namespaces/:namespace/configmaps',
      requiredParams: ['cluster', 'namespace'],
    },
    getServiceHealth: {
      method: 'get',
      path: '/kubernetes/namespaces/:namespace/health',
      requiredParams: ['namespace'],
    },
    getDeploymentPods: {
      method: 'get',
      path: '/kubernetes/clusters/:cluster/namespaces/:namespace/deployments/:deployment/pods',
      requiredParams: ['namespace', 'deployment', 'cluster'],
    },
    patchDeploymentScale: {
      method: 'patch',
      path: '/kubernetes/clusters/:cluster/namespaces/:namespace/deployments/:deployment/scale',
      requiredParams: ['namespace', 'deployment', 'cluster'],
      requiredBody: ['scale'],
    },
    getPodLogs: {
      method: 'get',
      path: '/kubernetes/clusters/:cluster/namespaces/:namespace/pods/:pod/logs',
      requiredParams: ['cluster', 'namespace', 'pod'],
      requiredQueryParams: ['container'], // ?container=containerName&previous=true/false
    },
    terminatePod: {
      method: 'delete',
      path: '/kubernetes/clusters/:cluster/namespaces/:namespace/pods/:pod',
      requiredParams: ['cluster', 'namespace', 'pod'],
    },
  };

  constructor(protected http: Http,
              protected configService: ConfigService) {
    super(http, configService);
  }

  getNamespaceKibanaTrafficDashboardURL(request: BaseRequest): Observable<String> {
    return this.callService(request, this.ENDPOINTS.getNamespaceKibanaTrafficDashboardURL);
  }

  getNamespaceLabels(request: BaseRequest): Observable<LabelsResponse> {
    return this.callService(request, this.ENDPOINTS.getNamespaceLabels);
  }

  getServiceURL(request: BaseRequest): Observable<String> {
    return this.callService(request, this.ENDPOINTS.getServiceURL);
  }

  getServiceUpstreamURL(request: BaseRequest): Observable<String> {
    return this.callService(request, this.ENDPOINTS.getServiceUpstreamURL);
  }

  getServiceConfigMaps(request: BaseRequest): Observable<any> {
    return this.callService(request, this.ENDPOINTS.getServiceConfigMaps);
  }

  getServiceHealth(request: BaseRequest): Observable<Boolean> {
    return this.callService(request, this.ENDPOINTS.getServiceHealth);
  }

  getNamespaceDeployments(request: BaseRequest): Observable<{ cluster: string; deployments: DeploymentResponse[] }[]> {
    return this.callService(request, this.ENDPOINTS.getNamespaceDeployments);
  }

  getNamespaceEvents(request: BaseRequest): Observable<EventResponse[]> {
    return this.callService(request, this.ENDPOINTS.getNamespaceEvents);
  }

  getDeploymentPods(request: BaseRequest): Observable<PodResponse[]> {
    return this.callService(request, this.ENDPOINTS.getDeploymentPods);
  }

  patchDeploymentScale(request: BaseRequest): Observable<DeploymentResponse> {
    return this.callService(request, this.ENDPOINTS.patchDeploymentScale);
  }

  getPodLogs(request: BaseRequest): Observable<string[]> {
    return this.callService(request, this.ENDPOINTS.getPodLogs);
  }

  deletePod(request: BaseRequest): Observable<any> {
    return this.callService(request, this.ENDPOINTS.terminatePod);
  }

}
