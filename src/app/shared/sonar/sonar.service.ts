import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../config/config.service';
import { BaseService } from '../base-service/base.service';
import { BaseRequest } from '../base-service/base-request';
import { SonarProjects } from './sonar-project';
import { SonarMetricsResponse } from './sonar-metric-response';
import { Endpoints } from '../base-service/endpoints';

@Injectable()
export class SonarService extends BaseService {

  protected serviceDomainUrl: string = this.configService.getConfig('serviceBaseUrl');

  private ENDPOINTS: Endpoints = {
    getMetrics: {
      method: 'get',
      path: '/sonar/metrics/:owner/:name/:branch',
      requiredParams: ['owner', 'name', 'branch'],
      requiredQueryParams: ['metrics'],
    },
    getProjects: {
      method: 'get',
      path: '/sonar/projects',
    },
  };

  constructor(protected http: Http,
              protected configService: ConfigService) {
    super(http, configService);
  }

  getMetrics(request: BaseRequest): Observable<SonarMetricsResponse> {
    return this.callService(request, this.ENDPOINTS.getMetrics);
  }

  getProjects(): Observable<SonarProjects> {
    return this.callService({}, this.ENDPOINTS.getProjects);
  }

}
