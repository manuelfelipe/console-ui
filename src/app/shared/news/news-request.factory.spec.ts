import { TestBed } from '@angular/core/testing';
import { NewsRequestFactory } from './news-request.factory';
import { BaseRequest } from '../base-service/base-request';

describe('NewsRequestFactory Tests', () => {
  let requestFactory: NewsRequestFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NewsRequestFactory,
      ],
    });
  });

  beforeEach(() => {
    requestFactory = new NewsRequestFactory();
  });

  it('should be instantiable', () => {
    expect(requestFactory).toBeDefined();
  });

  describe('toGetNewsRequest', () => {
    it('should return null values when null is passed', () => {
      const EXPECTED: BaseRequest = {
        queryParams: {
          limit: null,
        }
      };

      const request = requestFactory.toGetNewsRequest(null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        queryParams: {
          limit: 3,
        }
      };

      const request = requestFactory.toGetNewsRequest(3);
      expect(request).toEqual(EXPECTED);
    });
  });
});
