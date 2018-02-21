import { Observable } from 'rxjs/Observable';
import { BaseRequest } from '../base-service/base-request';
import { SonarService } from './sonar.service';
import { SonarMetrics } from './sonar-metric';
import { SonarProjects } from './sonar-project';

class SonarServiceMock {

  getMetrics(request: BaseRequest): Observable<SonarMetrics> {
    throw new Error('SonarServiceMock.getMetrics unimplemented');
  }

  getProjects(): Observable<SonarProjects> {
    throw new Error('SonarServiceMock.getProjects unimplemented');
  }

}

export const SONAR_SERVICE_MOCK_PROVIDER = {
  provide: SonarService,
  useClass: SonarServiceMock,
};
