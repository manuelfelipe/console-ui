import { Observable } from 'rxjs/Observable';
import { BaseRequest } from '../base-service/base-request';
import { ProvisionsService } from './provisions.service';

class ProvisionsServiceMock {
  initNewProject(request: BaseRequest): Observable<any> {
    throw new Error('ProvisionsServiceMock.initNewProject unimplemented');
  }

  provisionApp(request: BaseRequest): Observable<any> {
    throw new Error('ProvisionsServiceMock.provisionApp unimplemented');
  }

  provisionDB(request: BaseRequest): Observable<any> {
    throw new Error('ProvisionsServiceMock.provisionDB unimplemented');
  }

  checkDNS(request: BaseRequest): Observable<any> {
    throw new Error('ProvisionsServiceMock.checkDNS unimplemented');
  }

  provisionDNS(request: BaseRequest): Observable<any> {
    throw new Error('ProvisionsServiceMock.provisionDNS unimplemented');
  }
}

export const PROVISIONS_SERVICE_MOCK_PROVIDER = {
  provide: ProvisionsService,
  useClass: ProvisionsServiceMock,
};
