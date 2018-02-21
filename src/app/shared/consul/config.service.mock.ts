import { Observable } from 'rxjs/Observable';
import { BaseRequest } from '../base-service/base-request';
import { ConsulService } from './consul.service';

class ConsulServiceMock {

  getKeys(request: BaseRequest): Observable<string[]> {
    throw new Error('ConsulServiceMock.getKeys unimplemented');
  }

  getValue(request: BaseRequest): Observable<any> {
    throw new Error('ConsulServiceMock.getValue unimplemented');
  }

  setConfig(request: BaseRequest): Observable<any> {
    throw new Error('ConsulServiceMock.setConfig unimplemented');
  }

  deleteConfig(request: BaseRequest): Observable<any> {
    throw new Error('ConsulServiceMock.deleteConfig unimplemented');
  }

}

export const CONSUL_SERVICE_MOCK_PROVIDER = {
  provide: ConsulService,
  useClass: ConsulServiceMock,
};
