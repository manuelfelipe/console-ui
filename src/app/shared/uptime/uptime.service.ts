import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Endpoints } from '../base-service/endpoints';
import { ConfigService } from '../config/config.service';
import { BaseService } from '../base-service/base.service';
import { BaseRequest } from '../base-service/base-request';
import { UptimeService as UptimeServiceModel } from './uptime-service';
import { UptimeResponse } from './uptime-response';
import { DowntimeResponse } from './downtime-response';

@Injectable()
export class UptimeService extends BaseService {

  protected serviceDomainUrl: string = this.configService.getConfig('serviceBaseUrl');

  private ENDPOINTS: Endpoints = {
    getSLA: {
      method: 'get',
      path: '/uptimes/sla',
      requiredQueryParams: ['category', 'kind', 'since', 'to'],
    },
    getUptimes: {
      method: 'get',
      path: '/uptimes/uptimes',
      requiredQueryParams: ['category', 'kind', 'interval', 'since', 'to'],
    },
    getDowntimes: {
      method: 'get',
      path: '/uptimes/downtimes',
      requiredQueryParams: ['category', 'kind', 'since', 'to'],
    },
    getInfras: {
      method: 'get',
      path: '/uptimes/infras',
    },
    getInfrasUptimes: {
      method: 'get',
      path: '/uptimes/infras/uptimes',
      requiredQueryParams: ['interval', 'since', 'to'],
    },
  };

  constructor(protected http: Http,
              protected configService: ConfigService) {
    super(http, configService);
  }

  getSLA(request: BaseRequest): Observable<Number> {
    return this.callService(request, this.ENDPOINTS.getSLA);
  }

  getUptimes(request: BaseRequest): Observable<UptimeResponse[]> {
    return this.callService(request, this.ENDPOINTS.getUptimes);
  }

  getDowntimes(request: BaseRequest): Observable<DowntimeResponse[]> {
    return this.callService(request, this.ENDPOINTS.getDowntimes);
  }

  getInfras(): Observable<UptimeServiceModel[]> {
    return this.callService({}, this.ENDPOINTS.getInfras);
  }

  getInfrasUptimes(request: BaseRequest): Observable<{ infra: UptimeServiceModel, uptimes: UptimeResponse[] }[]> {
    return this.callService(request, this.ENDPOINTS.getInfrasUptimes);
  }

}
