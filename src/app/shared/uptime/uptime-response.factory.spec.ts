import { TestBed } from '@angular/core/testing';
import { UptimeResponseFactory } from './uptime-response.factory';
import { Uptime } from './uptime';
import { DAILY_UPTIMES_RESPONSE } from './uptimes.data';
import { Downtime } from './downtime';
import { DOWNTIMES_RESPONSE } from './downtimes.data';

describe('UptimeResponseFactory Tests', () => {
  let responseFactory: UptimeResponseFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UptimeResponseFactory,
      ],
    });
  });

  beforeEach(() => {
    responseFactory = new UptimeResponseFactory();
  });

  it('should be instantiable', () => {
    expect(responseFactory).toBeDefined();
  });

  describe('toUptime', () => {
    it('should return null when null is passed', () => {
      const response = responseFactory.toUptime(null);
      expect(response).toBeNull();
    });

    it('should return correct response', () => {
      const EXPECTED: Uptime = {
        id: 'daily_uptime_1',
        uptimeId: '59d27108750d192d0857609c',
        date: new Date(1506816000 * 1000),
        label: 'October 1st, 2017',
        sla: 50,
        description: 'console-server, Oct. 1st, 2017'
      };

      const response = responseFactory.toUptime(DAILY_UPTIMES_RESPONSE[0]);
      expect(response).toEqual(EXPECTED);
    });
  });

  describe('toUptimes', () => {
    it('should return [] when null is passed', () => {
      const response = responseFactory.toUptimes(null);
      expect(response).toEqual([]);
    });

    it('should return correct response', () => {
      const EXPECTED: Uptime[] = [
        {
          id: 'daily_uptime_1',
          uptimeId: '59d27108750d192d0857609c',
          date: new Date(1506816000 * 1000),
          label: 'October 1st, 2017',
          sla: 50,
          description: 'console-server, Oct. 1st, 2017'
        },
        {
          id: 'daily_uptime_2',
          uptimeId: '59d27108750d192d0857609c',
          date: new Date(1506902400 * 1000),
          label: 'October 2nd, 2017',
          sla: 55,
          description: 'console-server, Oct. 2nd, 2017'
        },
        {
          id: 'daily_uptime_3',
          uptimeId: '59d27108750d192d0857609c',
          date: new Date(1506988800 * 1000),
          label: 'October 3rd, 2017',
          sla: 60,
          description: 'console-server, Oct. 3rd, 2017'
        },
      ];

      const response = responseFactory.toUptimes(DAILY_UPTIMES_RESPONSE.slice(0, 3));
      expect(response).toEqual(EXPECTED);
    });
  });

  describe('toDowntime', () => {
    it('should return null when null is passed', () => {
      const response = responseFactory.toDowntime(null);
      expect(response).toBeNull();
    });

    it('should return correct response', () => {
      const EXPECTED: Downtime = {
        id: '59d294bf750d192da0e6d146',
        uptimeId: '59d27108750d192d0857609c',
        downStartDate: new Date(1506816000 * 1000),
        downEndDate: new Date(1506823200 * 1000),
        extra: {
          statusCode: 500,
          text: 'User did something he shouldn\'t have',
        },
      };

      const response = responseFactory.toDowntime(DOWNTIMES_RESPONSE[0]);
      expect(response).toEqual(EXPECTED);
    });
  });

  describe('toDowntimes', () => {
    it('should return [] when null is passed', () => {
      const response = responseFactory.toDowntimes(null);
      expect(response).toEqual([]);
    });

    it('should return correct response', () => {
      const EXPECTED: Downtime[] = [
        {
          id: '59d294bf750d192da0e6d146',
          uptimeId: '59d27108750d192d0857609c',
          downStartDate: new Date(1506816000 * 1000),
          downEndDate: new Date(1506823200 * 1000),
          extra: {
            statusCode: 500,
            text: 'User did something he shouldn\'t have',
          },
        },
        {
          id: '59d294c4750d192da0e6d147',
          uptimeId: '59d27108750d192d0857609c',
          downStartDate: new Date(1506902400 * 1000),
          downEndDate: new Date(1506945600 * 1000),
          extra: {
            statusCode: 500,
            text: 'User did something he shouldn\'t have... again',
          },
        }
      ];

      const response = responseFactory.toDowntimes(DOWNTIMES_RESPONSE);
      expect(response).toEqual(EXPECTED);
    });
  });
});
