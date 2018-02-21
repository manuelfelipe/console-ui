import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../config/config.service';
import { BaseService } from '../base-service/base.service';
import { BaseRequest } from '../base-service/base-request';
import { Endpoints } from '../base-service/endpoints';
import { MetricResponse } from './metric-response';

@Injectable()
export class MetricService extends BaseService {

  protected serviceDomainUrl: string = this.configService.getConfig('serviceBaseUrl');

  private ENDPOINTS: Endpoints = {
    getLatestMetric: {
      method: 'get',
      path: '/metrics/:type',
      requiredParams: ['type'],
    },
  };

  constructor(protected http: Http,
              protected configService: ConfigService) {
    super(http, configService);
  }

  getLatestMetric(request: BaseRequest): Observable<MetricResponse> {
    return this.callService(request, this.ENDPOINTS.getLatestMetric);
  }

}
