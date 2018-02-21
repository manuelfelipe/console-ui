import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Endpoints } from '../base-service/endpoints';
import { BaseRequest } from '../base-service/base-request';
import { BaseService } from '../base-service/base.service';
import { ConfigService } from '../config/config.service';

@Injectable()
export class SwaggerService extends BaseService {

  protected serviceDomainUrl: string = this.configService.getConfig('serviceBaseUrl');

  private ENDPOINTS: Endpoints = {
    getSwaggerFile: {
      method: 'get',
      path: '/swagger/:namespace',
      requiredParams: ['namespace'],
    },
  };

  constructor(protected http: Http,
              protected configService: ConfigService) {
    super(http, configService);
  }

  getSwaggerFile(request: BaseRequest): Observable<any> {
    return this.callService(request, this.ENDPOINTS.getSwaggerFile);
  }

}
