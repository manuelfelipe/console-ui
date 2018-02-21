import { Event, NavigationExtras, Router, RoutesRecognized } from '@angular/router';
import { Observable } from 'rxjs/Observable';

export class RouterMock {

  ne = new RoutesRecognized(0, 'http://localhost:4200/analyze', 'http://localhost:4200/analyze', null);
  events: Observable<Event> = new Observable(observer => {
    observer.next(this.ne);
    observer.complete();
  });

  navigate(commands: any[], extras?: NavigationExtras) {
    return Promise.reject('RouterMock.navigate unimplemented');
  }
}

export const ROUTER_MOCK_PROVIDER = {
  provide: Router,
  useClass: RouterMock,
};
