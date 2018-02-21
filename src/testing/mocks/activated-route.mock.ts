import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

export class ActivatedRouteMock {
  queryParams = Observable.of({});
  params = Observable.of({});

  data = Observable.of({});

  parent = {
    data: Observable.of({})
  };
}

export const ACTIVATED_ROUTE_MOCK_PROVIDER = {
  provide: ActivatedRoute,
  useClass: ActivatedRouteMock,
};
