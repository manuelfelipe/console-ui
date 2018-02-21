import { Observable } from 'rxjs/Observable';
import { BaseRequest } from '../base-service/base-request';
import { SiteSpeedService } from './sitespeed.service';
import { CronJobResponse } from '../kubernetes/cronjob/cronjob-response';
import { CronJobReport } from '../kubernetes/cronjob/cronjob';

class SiteSpeedServiceMock {

  getCronJobs(): Observable<CronJobResponse[]> {
    throw new Error('SiteSpeedServiceMock.getCronJobs unimplemented');
  }

  createCronJob(request: BaseRequest): Observable<CronJobResponse> {
    throw new Error('SiteSpeedServiceMock.createCronJob unimplemented');
  }

  updateCronJob(request: BaseRequest): Observable<CronJobResponse> {
    throw new Error('SiteSpeedServiceMock.updateCronJob unimplemented');
  }

  deleteCronJob(request: BaseRequest): Observable<CronJobResponse> {
    throw new Error('SiteSpeedServiceMock.deleteCronJob unimplemented');
  }

  getCronJobReports(request: BaseRequest): Observable<CronJobReport[]> {
    throw new Error('SiteSpeedServiceMock.getCronJobReports unimplemented');
  }

}

export const SITESPEED_SERVICE_MOCK_PROVIDER = {
  provide: SiteSpeedService,
  useClass: SiteSpeedServiceMock,
};
