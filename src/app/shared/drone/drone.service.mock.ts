import { Observable } from 'rxjs/Observable';
import { DroneService } from './drone.service';
import { BuildResponse } from './build/build-response';
import { BaseRequest } from '../base-service/base-request';
import { Contributor } from './build/contributor';

class DroneServiceMock {

  getDeploymentsCount(): Observable<Number> {
    throw new Error('DroneServiceMock.getDeploymentsCount unimplemented');
  }

  getBuilds(request: BaseRequest): Observable<BuildResponse[]> {
    throw new Error('DroneServiceMock.getBuilds unimplemented');
  }

  getContributors(request: BaseRequest): Observable<Contributor[]> {
    throw new Error('DroneServiceMock.getContributors unimplemented');
  }

  getBuild(request: BaseRequest): Observable<BuildResponse> {
    throw new Error('DroneServiceMock.getBuild unimplemented');
  }

  getLatestBuild(request: BaseRequest): Observable<BuildResponse> {
    throw new Error('DroneServiceMock.getLatestBuild unimplemented');
  }

  restartBuild(request: BaseRequest): Observable<BuildResponse> {
    throw new Error('DroneServiceMock.restartBuild unimplemented');
  }

  stopBuild(request: BaseRequest): Observable<BuildResponse> {
    throw new Error('DroneServiceMock.stopBuild unimplemented');
  }

  getBuildLogs(request: BaseRequest): Observable<BuildResponse> {
    throw new Error('DroneServiceMock.getBuildLogs unimplemented');
  }

}

export const DRONE_SERVICE_MOCK_PROVIDER = {
  provide: DroneService,
  useClass: DroneServiceMock,
};
