import { Observable } from 'rxjs/Observable';
import { WrappedSocket } from 'ng-socket-io/socket-io.service';

export class WrappedSocketMock {
  emit(eventName: string, data: any, callback?: Function): any {
    return Promise.reject('SocketMock.emit unimplemented');
  }

  fromEvent<T>(eventName: string): Observable<T> {
    return Observable.throw('SocketMock.fromEvent unimplemented');
  }
}

export const SOCKET_MOCK_PROVIDER = {
  provide: WrappedSocket,
  useClass: WrappedSocketMock,
};
