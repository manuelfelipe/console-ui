import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';
import { Event } from './event';
import { EVENTS } from '../base-service/event-request';
import { environment } from '../../../environments/environment';

@Injectable()
export class EventSocketService extends Socket {

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

  watchActivities(namespace?: string): Observable<Event> {
    namespace = namespace || 'ALL';

    this.emit(EVENTS.PUBSUB_EVENTS_REQUEST, {
      namespace,
    });

    return this.fromEvent<Event>(`PUBSUB_EVENTS_${namespace}`);
  }

}
