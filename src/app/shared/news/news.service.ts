import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../config/config.service';
import { BaseService } from '../base-service/base.service';
import { Endpoints } from '../base-service/endpoints';
import { NewsResponse } from './news-response';
import { BaseRequest } from '../base-service/base-request';

@Injectable()
export class NewsService extends BaseService {

  protected serviceDomainUrl: string = this.configService.getConfig('serviceBaseUrl');

  private ENDPOINTS: Endpoints = {
    getNews: {
      method: 'get',
      path: '/news',
    },
  };

  constructor(protected http: Http,
              protected configService: ConfigService) {
    super(http, configService);
  }

  getNews(request: BaseRequest): Observable<NewsResponse[]> {
    return this.callService(request, this.ENDPOINTS.getNews);
  }

}
