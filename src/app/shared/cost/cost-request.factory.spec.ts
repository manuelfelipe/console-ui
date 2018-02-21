import { TestBed } from '@angular/core/testing';
import { BaseRequest } from '../base-service/base-request';
import { CostRequestFactory } from './cost-request.factory';

describe('CostRequestFactory Tests', () => {
  let requestFactory: CostRequestFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CostRequestFactory,
      ],
    });
  });

  beforeEach(() => {
    requestFactory = new CostRequestFactory();
  });

  it('should be instantiable', () => {
    expect(requestFactory).toBeDefined();
  });

  describe('toGetCostsRequest', () => {
    it('should return no `component` queryParam if null is passed', () => {
      const EXPECTED: BaseRequest = {
        queryParams: {}
      };

      const request = requestFactory.toGetCostsRequest(null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        queryParams: {
          component: 'clusters',
        }
      };

      const request = requestFactory.toGetCostsRequest('clusters');
      expect(request).toEqual(EXPECTED);
    });
  });

});
