import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../base-service/base.service';
import { ConfigService } from '../config/config.service';
import { Endpoints } from '../base-service/endpoints';
import { Alert } from './alert';

@Injectable()
export class AlertService extends BaseService {

  protected serviceDomainUrl: string = this.configService.getConfig('serviceBaseUrl');

  private ENDPOINTS: Endpoints = {
    getAlerts: {
      method: 'get',
      path: '/alerts',
    },
  };

  constructor(protected http: Http,
              protected configService: ConfigService) {
    super(http, configService);
  }

  getAlerts(): Observable<Alert[]> {
    return this.callService({}, this.ENDPOINTS.getAlerts);
  }

}
