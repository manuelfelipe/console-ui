import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../config/config.service';
import { BaseService } from '../base-service/base.service';
import { Endpoints } from '../base-service/endpoints';
import { BaseRequest } from '../base-service/base-request';
import { Log } from 'app/shared/elasticsearch/log';
import { APICatalogEntry } from './api-catalog-entry';
import { APICatalogServiceGroupResponse } from './api-catalog-service-group';

@Injectable()
export class ElasticsearchService extends BaseService {

  protected serviceDomainUrl: string = this.configService.getConfig('serviceBaseUrl');

  private ENDPOINTS: Endpoints = {
    getLogs: {
      method: 'get',
      path: '/elasticsearch/search/:namespace',
      requiredParams: ['namespace'],
      // queryParams: text, timestamp, rangeType, order
    },
    searchAPICatalog: {
      method: 'get',
      path: '/elasticsearch/api-catalog/:environment',
      requiredParams: ['environment'],
      // queryParams: serviceGroup, searchTerms, comma delimited
    },
    getServiceGroups: {
      method: 'get',
      path: '/elasticsearch/api-catalog/:environment/service-groups',
      requiredParams: ['environment'],
    },
  };

  constructor(protected http: Http,
              protected configService: ConfigService) {
    super(http, configService);
  }

  getLogs(request: BaseRequest): Observable<Log[]> {
    return this.callService(request, this.ENDPOINTS.getLogs);
  }

  searchAPICatalog(request: BaseRequest): Observable<APICatalogEntry[]> {
    return this.callService(request, this.ENDPOINTS.searchAPICatalog);
  }

  getServiceGroups(request: BaseRequest): Observable<APICatalogServiceGroupResponse> {
    return this.callService(request, this.ENDPOINTS.getServiceGroups);
  }
}
