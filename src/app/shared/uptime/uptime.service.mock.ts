import { Observable } from 'rxjs/Observable';
import { UptimeService } from './uptime.service';
import { BaseRequest } from '../base-service/base-request';
import { UptimeService as UptimeServiceModel } from './uptime-service';
import { UptimeResponse } from './uptime-response';
import { DowntimeResponse } from './downtime-response';

class UptimeServiceMock {

  getSLA(request: BaseRequest): Observable<Number> {
    throw new Error('UptimeServiceMock.getSLA unimplemented');
  }

  getUptimes(request: BaseRequest): Observable<UptimeResponse[]> {
    throw new Error('UptimeServiceMock.getUptimes unimplemented');
  }

  getDowntimes(request: BaseRequest): Observable<DowntimeResponse[]> {
    throw new Error('UptimeServiceMock.getDowntimes unimplemented');
  }

  getInfras(request: BaseRequest): Observable<UptimeServiceModel[]> {
    throw new Error('UptimeServiceMock.getInfras unimplemented');
  }

  getInfrasUptimes(request: BaseRequest): Observable<{ infra: UptimeServiceModel, uptimes: UptimeResponse[] }[]> {
    throw new Error('UptimeServiceMock.getInfrasUptimes unimplemented');
  }

}

export const UPTIME_SERVICE_MOCK_PROVIDER = {
  provide: UptimeService,
  useClass: UptimeServiceMock,
};
