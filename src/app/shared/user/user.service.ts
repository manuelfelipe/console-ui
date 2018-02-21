import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../config/config.service';
import { BaseService } from '../base-service/base.service';
import { Endpoints } from '../base-service/endpoints';

@Injectable()
export class UserService extends BaseService {

  protected serviceDomainUrl: string = this.configService.getConfig('serviceBaseUrl');

  private ENDPOINTS: Endpoints = {
    validateUserToken: {
      method: 'get',
      path: '/auth/validate',
    },
  };

  constructor(protected http: Http,
              protected configService: ConfigService) {
    super(http, configService);
  }

  validateUserToken(): Observable<Boolean> {
    return this.callService({}, this.ENDPOINTS.validateUserToken);
  }

}
