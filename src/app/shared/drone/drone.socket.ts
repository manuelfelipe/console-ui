import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';
import { Log } from './log/log';
import { BuildResponse } from './build/build-response';
import { EVENTS } from '../base-service/event-request';
import { environment } from '../../../environments/environment';

@Injectable()
export class DroneSocketService extends Socket {

  constructor() {
    super({
      url: environment.socket.baseUrl,
      options: {
        path: environment.socket.path,
        query: {
          token: localStorage.getItem('thecloud.token')
        }
      }
    });
  }

  streamBuildFeed(owner: string, name: string, number: number): Observable<BuildResponse> {
    if (!owner) {
      return Observable.throw('owner param is required');
    }

    if (!name) {
      return Observable.throw('name param is required');
    }

    if (!number && number !== 0) {
      return Observable.throw('number param is required');
    }

    this.emit(EVENTS.DRONE_BUILD_FEED_REQUEST, {
      owner,
      name,
      number,
    });

    return this.fromEvent<BuildResponse>(`DRONE_BUILD_FEED_${owner}_${name}_${number}`);
  }

  streamBuildLogs(owner: string, name: string, number: number, job: number): Observable<Log> {
    if (!owner) {
      return Observable.throw('owner param is required');
    }

    if (!name) {
      return Observable.throw('name param is required');
    }

    if (!number && number !== 0) {
      return Observable.throw('number param is required');
    }

    if (!job && job !== 0) {
      return Observable.throw('job param is required');
    }

    this.emit(EVENTS.DRONE_BUILD_LOGS_REQUEST, {
      owner,
      name,
      number,
      job,
    });

    return this.fromEvent<Log>(['DRONE_BUILD_LOGS', owner, name, number, job].join('_'));
  }
}
