import { Observable } from 'rxjs/Observable';
import { Event } from './event';
import { EventSocketService } from './event.socket';

class EventSocketServiceMock {

  watchActivities(namespace: string = 'ALL'): Observable<Event> {
    throw new Error('EventSocketServiceMock.watchActivities unimplemented');
  }

}

export const EVENT_SOCKET_SERVICE_MOCK_PROVIDER = {
  provide: EventSocketService,
  useClass: EventSocketServiceMock,
};
