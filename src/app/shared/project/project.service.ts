import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../config/config.service';
import { BaseService } from '../base-service/base.service';
import { BaseRequest } from '../base-service/base-request';
import { ProjectResponse } from './project-response';
import { Endpoints } from '../base-service/endpoints';

@Injectable()
export class ProjectService extends BaseService {

  protected serviceDomainUrl: string = this.configService.getConfig('serviceBaseUrl');

  private ENDPOINTS: Endpoints = {
    getProjects: {
      method: 'get',
      path: '/projects',
    },
    getProjectByNamespace: {
      method: 'get',
      path: '/projects/:namespace',
      requiredParams: ['namespace'],
    },
    searchProjects: {
      method: 'get',
      path: '/projects/search/:query',
      requiredParams: ['query'],
    },
  };

  constructor(protected http: Http,
              protected configService: ConfigService) {
    super(http, configService);
  }

  getProjects(): Observable<ProjectResponse[]> {
    return this.callService({}, this.ENDPOINTS.getProjects);
  }

  getProjectByNamespace(request: BaseRequest): Observable<ProjectResponse> {
    return this.callService(request, this.ENDPOINTS.getProjectByNamespace);
  }

  searchProjects(request: BaseRequest): Observable<ProjectResponse[]> {
    return this.callService(request, this.ENDPOINTS.searchProjects);
  }

}
