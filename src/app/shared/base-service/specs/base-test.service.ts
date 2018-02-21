import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../../config/config.service';
import { BaseRequest } from '../base-request';
import { BaseService } from '../base.service';
import { BaseResponse } from '../base-response';

@Injectable()
export class BaseTestService extends BaseService {

  protected baseServiceUrl = '/baseTestServiceUrl';
  protected baseServiceKey = 'baseTestServiceKey';

  private ENDPOINTS = {
    requiredHeaders: {
      method: 'get',
      path: '/path',
      requiredHeaders: ['soajsauth'],
    },
    requiredBody: {
      method: 'post',
      path: '/path',
      requiredBody: ['data'],
    },
    requiredQueryParams: {
      method: 'put',
      path: '/path',
      requiredQueryParams: ['macId'],
    },
    requiredParams: {
      method: 'delete',
      path: '/path/:paramName/:otherParamName',
      requiredParams: ['paramName', 'otherParamName'],
    },
  };

  constructor(protected http: Http,
              protected configService: ConfigService) {
    super(http, configService);
  }

  requiredHeaders(request: BaseRequest): Observable<BaseResponse> {
    return this.callService(request, this.ENDPOINTS.requiredHeaders);
  }

  requiredBody(request: BaseRequest): Observable<BaseResponse> {
    return this.callService(request, this.ENDPOINTS.requiredBody);
  }

  requiredQueryParams(request: BaseRequest): Observable<BaseResponse> {
    return this.callService(request, this.ENDPOINTS.requiredQueryParams);
  }

  requiredParams(request: BaseRequest): Observable<BaseResponse> {
    return this.callService(request, this.ENDPOINTS.requiredParams);
  }

}
