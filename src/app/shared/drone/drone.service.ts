import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../config/config.service';
import { BaseService } from '../base-service/base.service';
import { BaseRequest } from '../base-service/base-request';
import { BuildResponse } from './build/build-response';
import { Log } from './log/log';
import { Contributor } from './build/contributor';
import { Endpoints } from '../base-service/endpoints';

@Injectable()
export class DroneService extends BaseService {

  protected serviceDomainUrl: string = this.configService.getConfig('serviceBaseUrl');

  private ENDPOINTS: Endpoints = {
    getDeploymentsCount: {
      method: 'get',
      path: '/drone/deployments/total',
    },
    getBuilds: {
      method: 'get',
      path: '/drone/builds/:owner/:name',
      requiredParams: ['owner', 'name'],
    },
    getContributors: {
      method: 'get',
      path: '/drone/builds/:owner/:name/contributors',
      requiredParams: ['owner', 'name'],
    },
    getBuild: {
      method: 'get',
      path: '/drone/builds/:owner/:name/:number',
      requiredParams: ['owner', 'name', 'number'],
    },
    getLatestBuild: {
      method: 'get',
      path: '/drone/builds/:owner/:name/latest',
      requiredParams: ['owner', 'name'],
    },
    restartBuild: {
      method: 'post',
      path: '/drone/builds/:owner/:name/:number',
      requiredParams: ['owner', 'name', 'number'],
    },
    stopBuild: {
      method: 'delete',
      path: '/drone/builds/:owner/:name/:number/:job',
      requiredParams: ['owner', 'name', 'number', 'job'],
    },
    getBuildLogs: {
      method: 'get',
      path: '/drone/builds/:owner/:name/logs/:number/:job',
      requiredParams: ['owner', 'name', 'number', 'job'],
    },
  };

  constructor(protected http: Http,
              protected configService: ConfigService) {
    super(http, configService);
  }

  getDeploymentsCount(): Observable<{ counter: number }> {
    return this.callService({}, this.ENDPOINTS.getDeploymentsCount);
  }

  getBuilds(request: BaseRequest): Observable<BuildResponse[]> {
    return this.callService(request, this.ENDPOINTS.getBuilds);
  }

  getContributors(request: BaseRequest): Observable<Contributor[]> {
    return this.callService(request, this.ENDPOINTS.getContributors);
  }

  getBuild(request: BaseRequest): Observable<BuildResponse> {
    return this.callService(request, this.ENDPOINTS.getBuild);
  }

  getLatestBuild(request: BaseRequest): Observable<BuildResponse> {
    return this.callService(request, this.ENDPOINTS.getLatestBuild);
  }

  restartBuild(request: BaseRequest): Observable<BuildResponse> {
    return this.callService(request, this.ENDPOINTS.restartBuild);
  }

  stopBuild(request: BaseRequest): Observable<BuildResponse> {
    return this.callService(request, this.ENDPOINTS.stopBuild);
  }

  getBuildLogs(request: BaseRequest): Observable<Log[]> {
    return this.callService(request, this.ENDPOINTS.getBuildLogs);
  }

}
