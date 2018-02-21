import { Observable } from 'rxjs/Observable';
import { AlertService } from './alert.service';
import { Alert } from './alert';

class AlertServiceMock {

  getAlerts(): Observable<Alert[]> {
    throw new Error('AlertServiceMock.getAlerts unimplemented');
  }

}

export const ALERT_SERVICE_MOCK_PROVIDER = {
  provide: AlertService,
  useClass: AlertServiceMock,
};
