import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../base-service/base.service';
import { BaseRequest } from '../base-service/base-request';
import { ConfigService } from '../config/config.service';
import { Endpoints } from '../base-service/endpoints';
import { Cost } from './cost';

@Injectable()
export class CostService extends BaseService {

  protected serviceDomainUrl: string = this.configService.getConfig('serviceBaseUrl');

  private ENDPOINTS: Endpoints = {
    getCosts: {
      method: 'get',
      path: '/costs',  // ?component=clusters|databases|elasticsearch|etc
    },
  };

  constructor(protected http: Http,
              protected configService: ConfigService) {
    super(http, configService);
  }

  getCosts(request: BaseRequest): Observable<Cost> {
    return this.callService(request, this.ENDPOINTS.getCosts);
  }

}
