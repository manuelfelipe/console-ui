import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../base-service/base.service';
import { ConfigService } from '../config/config.service';
import { BaseRequest } from '../base-service/base-request';
import { NamespaceOrPodResourcesData, NamespaceResources } from './namespace-resources';
import { NodesResources } from './nodes-resources';
import { Endpoints } from '../base-service/endpoints';

@Injectable()
export class ResourcesService extends BaseService {

  protected serviceDomainUrl: string = this.configService.getConfig('serviceBaseUrl');

  private ENDPOINTS: Endpoints = {
    getNodesResources: {
      method: 'get',
      path: '/kubernetes/resources',
    },
    getNamespaceResources: {
      method: 'get',
      path: '/kubernetes/namespaces/:namespace/resources',
      requiredParams: ['namespace'],
    },
    getPodResources: {
      method: 'get',
      path: '/kubernetes/clusters/:cluster/namespaces/:namespace/pods/:pod/resources',
      requiredParams: ['cluster', 'namespace', 'pod'],
    },
  };

  constructor(protected http: Http,
              protected configService: ConfigService) {
    super(http, configService);
  }

  getNodesResources(): Observable<NodesResources[]> {
    return this.callService({}, this.ENDPOINTS.getNodesResources);
  }

  getNamespaceResources(request: BaseRequest): Observable<NamespaceResources[]> {
    return this.callService(request, this.ENDPOINTS.getNamespaceResources);
  }

  getPodResources(request: BaseRequest): Observable<NamespaceOrPodResourcesData[]> {
    return this.callService(request, this.ENDPOINTS.getPodResources);
  }

}
