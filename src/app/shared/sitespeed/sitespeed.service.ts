import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../base-service/base.service';
import { BaseRequest } from '../base-service/base-request';
import { ConfigService } from '../config/config.service';
import { Endpoints } from '../base-service/endpoints';
import { CronJobResponse } from '../kubernetes/cronjob/cronjob-response';
import { CronJobReport } from '../kubernetes/cronjob/cronjob';

@Injectable()
export class SiteSpeedService extends BaseService {

  protected serviceDomainUrl: string = this.configService.getConfig('serviceBaseUrl');

  private ENDPOINTS: Endpoints = {
    getCronJobs: {
      method: 'get',
      path: '/sitespeed/cronjobs',
    },
    createCronJob: {
      method: 'post',
      path: '/sitespeed/cronjobs',
      requiredBody: ['name', 'schedule', 'urls', 'args'],
    },
    updateCronJob: {
      method: 'put',
      path: '/sitespeed/cronjobs/:name',
      requiredBody: ['schedule', 'urls', 'args'],
      requiredParams: ['name'],
    },
    deleteCronJob: {
      method: 'delete',
      path: '/sitespeed/cronjobs/:name',
      requiredParams: ['name'],
    },
    getCronJobReports: {
      method: 'get',
      path: '/sitespeed/cronjobs/:name/reports',
      requiredParams: ['name'],
    },
  };

  constructor(protected http: Http,
              protected configService: ConfigService) {
    super(http, configService);
  }

  getCronJobs(): Observable<CronJobResponse[]> {
    return this.callService({}, this.ENDPOINTS.getCronJobs);
  }

  createCronJob(request: BaseRequest): Observable<CronJobResponse> {
    return this.callService(request, this.ENDPOINTS.createCronJob);
  }

  updateCronJob(request: BaseRequest): Observable<CronJobResponse> {
    return this.callService(request, this.ENDPOINTS.updateCronJob);
  }

  deleteCronJob(request: BaseRequest): Observable<CronJobResponse> {
    return this.callService(request, this.ENDPOINTS.deleteCronJob);
  }

  getCronJobReports(request: BaseRequest): Observable<CronJobReport[]> {
    return this.callService(request, this.ENDPOINTS.getCronJobReports);
  }

}
