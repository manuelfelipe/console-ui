import { TestBed } from '@angular/core/testing';
import { BaseRequest } from '../base-service/base-request';
import { EventRequestFactory } from './event-request.factory';

describe('EventRequestFactory Tests', () => {
  let requestFactory: EventRequestFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EventRequestFactory,
      ],
    });
  });

  beforeEach(() => {
    requestFactory = new EventRequestFactory();
  });

  it('should be instantiable', () => {
    expect(requestFactory).toBeDefined();
  });

  describe('toGetEventsRequest', () => {
    it('should return no namespace queryParam if null is passed', () => {
      const EXPECTED: BaseRequest = {
        queryParams: {
          namespace: 'NAMESPACE',
        }
      };

      const request = requestFactory.toGetEventsRequest('NAMESPACE', null, null, null);
      expect(request).toEqual(EXPECTED);
    });

    it('should return correct values', () => {
      const EXPECTED: BaseRequest = {
        queryParams: {
          namespace: 'NAMESPACE',
          user: 'USER',
          since: 'SINCE_DATE',
          to: 'TO_DATE',
        }
      };

      const request = requestFactory.toGetEventsRequest('NAMESPACE', 'USER', 'SINCE_DATE', 'TO_DATE');
      expect(request).toEqual(EXPECTED);
    });
  });

});
