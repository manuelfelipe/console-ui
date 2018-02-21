import { pickBy, identity } from 'lodash';
import { BaseRequest } from '../base-service/base-request';

export class EventRequestFactory {

  // `user`will match against name, username, and email
  toGetEventsRequest(namespace: string, user: string, since: string, to: string): BaseRequest {
    return {
      queryParams: pickBy({
        namespace,
        user,
        since,
        to,
      }, identity)
    };
  };

}
