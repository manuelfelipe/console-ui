import { Injectable } from '@angular/core';
import { Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ParamsServiceMock {
  getParam(query: string): Observable<string> {
    return Observable.throw('ParamsServiceMock.getParam unimplemented');
  }

  getParams(): Observable<Params> {
    return Observable.throw('ParamsServiceMock.getParams unimplemented');
  }
}
