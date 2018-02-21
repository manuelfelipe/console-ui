import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../base-service/base.service';
import { BaseRequest } from '../base-service/base-request';
import { ConfigService } from '../config/config.service';
import { Endpoints } from '../base-service/endpoints';

@Injectable()
export class ConsulService extends BaseService {

  protected serviceDomainUrl: string = this.configService.getConfig('serviceBaseUrl');

  private ENDPOINTS: Endpoints = {
    getKeys: {
      method: 'get',
      path: '/consul/kv/keys/:key',
    },
    getValue: {
      method: 'get',
      path: '/consul/kv/values/:key',
    },
    setConfig: {
      method: 'put',
      path: '/consul/kv/:key',
      requiredParams: ['key'],
    },
    deleteConfig: {
      method: 'delete',
      path: '/consul/kv/:key',
      requiredParams: ['key'],
    },
  };

  constructor(protected http: Http,
              protected configService: ConfigService) {
    super(http, configService);
  }

  getKeys(request: BaseRequest): Observable<string[]> {
    return this.callService(request, this.ENDPOINTS.getKeys);
  }

  getValue(request: BaseRequest): Observable<any> {
    return this.callService(request, this.ENDPOINTS.getValue);
  }

  setConfig(request: BaseRequest): Observable<any> {
    return this.callService(request, this.ENDPOINTS.setConfig);
  }

  deleteConfig(request: BaseRequest): Observable<any> {
    return this.callService(request, this.ENDPOINTS.deleteConfig);
  }

}
