import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ParamsService {

  constructor(private route: ActivatedRoute) {
  }

  /**
   * Returns the queried param value from the URL,
   * or undefined if not specified
   */
  getParam(query: string): Observable<string> {
    if (!query) {
      return Observable.throw('Param is required');
    }

    return this.getParams()
      .filter(params => !!params[query])
      .map(params => params[query]);
  }

  /**
   * Returns all params from the URL
   */
  getParams(): Observable<Params> {
    return this.route.queryParams;
  }
}
