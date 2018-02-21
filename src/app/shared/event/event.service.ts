import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../base-service/base.service';
import { BaseRequest } from '../base-service/base-request';
import { ConfigService } from '../config/config.service';
import { Endpoints } from '../base-service/endpoints';
import { Event } from './event';

@Injectable()
export class EventService extends BaseService {

  protected serviceDomainUrl: string = this.configService.getConfig('serviceBaseUrl');

  private ENDPOINTS: Endpoints = {
    getEvents: {
      method: 'get',
      path: '/events',  // ?namespace=xxx&user=yyy&since=date&to=date
    },
  };

  constructor(protected http: Http,
              protected configService: ConfigService) {
    super(http, configService);
  }

  getEvents(request: BaseRequest): Observable<Event[]> {
    return this.callService(request, this.ENDPOINTS.getEvents);
  }

}
