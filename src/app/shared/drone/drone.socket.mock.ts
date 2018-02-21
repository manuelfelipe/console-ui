import { Observable } from 'rxjs/Observable';
import { DroneSocketService } from './drone.socket';
import { BuildResponse } from './build/build-response';
import { Log } from './log/log';

class DroneSocketServiceMock {

  streamBuildFeed(owner: string, name: string, number: number): Observable<BuildResponse> {
    throw new Error('DroneSocketServiceMock.streamBuildFeed unimplemented');
  }

  streamBuildLogs(owner: string, name: string, number: number, job: number): Observable<Log> {
    throw new Error('DroneSocketServiceMock.streamBuildLogs unimplemented');
  }

}

export const DRONE_SOCKET_SERVICE_MOCK_PROVIDER = {
  provide: DroneSocketService,
  useClass: DroneSocketServiceMock,
};
