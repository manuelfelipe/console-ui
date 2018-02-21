import { ActivatedRoute } from '@angular/router';
import { async, TestBed } from '@angular/core/testing';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ParamsService } from './params.service';
import { ActivatedRouteMock } from '../../../testing/mocks/activated-route.mock';
import { Observable } from 'rxjs/Observable';

describe('ParamsService tests', () => {
  let route: ActivatedRoute;
  let paramsService: ParamsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useClass: ActivatedRouteMock
        },
        ParamsService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    route = TestBed.get(ActivatedRoute);
    paramsService = new ParamsService(route);
  });

  it('should be instantiable', () => {
    expect(paramsService).toBeDefined();
  });

  it('should throw an error if input param is missing', () => {
    route.queryParams = new BehaviorSubject({});

    paramsService.getParam(null)
      .subscribe(() => {
      }, error => {
        expect(error).toEqual('Param is required');
      });
  });

  it('should return undefined if param is not found', () => {
    route.queryParams = new BehaviorSubject({}).asObservable();

    paramsService.getParam('unknownParam')
      .subscribe(param => {
        expect(param).toBeUndefined();
      });
  });

  it('should return the param if found', () => {
    route.queryParams = Observable.of({ someParam: '81070613' });

    const EXPECTED = '81070613';

    paramsService.getParam('someParam')
      .subscribe(param => {
        expect(param).toEqual(EXPECTED);
      });
  });

  it('should return all params', () => {
    route.queryParams = new BehaviorSubject({ someParam: '81070613', anotherParam: 'BIOLOGIE' }).asObservable();

    const EXPECTED = {
      someParam: '81070613',
      anotherParam: 'BIOLOGIE',
    };

    paramsService.getParams()
      .subscribe(params => {
        expect(params).toEqual(EXPECTED);
      });
  });
});
