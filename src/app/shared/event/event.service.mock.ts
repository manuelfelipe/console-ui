import { Observable } from 'rxjs/Observable';
import { BaseRequest } from '../base-service/base-request';
import { Event } from './event';
import { EventService } from './event.service';

class EventServiceMock {

  getEvents(request: BaseRequest): Observable<Event[]> {
    throw new Error('EventServiceMock.getEvents unimplemented');
  }

}

export const EVENT_SERVICE_MOCK_PROVIDER = {
  provide: EventService,
  useClass: EventServiceMock,
};
