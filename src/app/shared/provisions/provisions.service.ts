import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../config/config.service';
import { BaseService } from '../base-service/base.service';
import { BaseRequest } from '../base-service/base-request';
import { Endpoints } from '../base-service/endpoints';

@Injectable()
export class ProvisionsService extends BaseService {

  protected serviceDomainUrl: string = this.configService.getConfig('serviceBaseUrl');

  private ENDPOINTS: Endpoints = {
    initNewProject: {
      method: 'post',
      path: '/provisions/:owner/:repo',
      requiredParams: ['owner', 'owner'],
      requiredBody: ['configs'],
    },
    provisionApp: {
      method: 'post',
      path: '/provisions/:owner/:repo/app',
      requiredBody: ['language', 'type'], // java|js|php, ui|api
    },
    provisionDB: {
      method: 'post',
      path: '/provisions/:owner/:repo/db',
      requiredBody: ['type'], // mysql, mongodb
    },
    checkDNS: {
      method: 'get',
      path: '/provisions/dns',
      requiredQueryParams: ['dns', 'type'], // avocat, pj.ca
    },
    provisionDNS: {
      method: 'post',
      path: '/provisions/:owner/:repo/dns',
      requiredBody: ['dns'], // { '.YP.CA': 'console', '.PJ.CA': 'console' }
    },
  };

  constructor(protected http: Http,
              protected configService: ConfigService) {
    super(http, configService);
  }

  initNewProject(request: BaseRequest): Observable<any> {
    return this.callService(request, this.ENDPOINTS.initNewProject);
  }

  provisionApp(request: BaseRequest): Observable<any> {
    return this.callService(request, this.ENDPOINTS.provisionApp);
  }

  provisionDB(request: BaseRequest): Observable<any> {
    return this.callService(request, this.ENDPOINTS.provisionDB);
  }

  checkDNS(request: BaseRequest): Observable<any> {
    return this.callService(request, this.ENDPOINTS.checkDNS);
  }

  provisionDNS(request: BaseRequest): Observable<any> {
    return this.callService(request, this.ENDPOINTS.provisionDNS);
  }

}
