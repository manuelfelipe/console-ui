import { identity, pickBy } from 'lodash';
import { BaseRequest } from '../base-service/base-request';
import { UptimeInterval } from './uptime-interval';

export class UptimeRequestFactory {
  toGetSLARequest(category: string, kind: string, namespace: string, since: number, to: number): BaseRequest {
    return {
      queryParams: pickBy({
        category,
        kind,
        namespace,
        since,
        to,
      }, identity),
    };
  };

  toGetUptimesRequest(category: string, kind: string, namespace: string, interval: UptimeInterval, since: number, to: number): BaseRequest {
    return {
      queryParams: pickBy({
        category,
        kind,
        namespace,
        interval: UptimeInterval[interval],
        since,
        to,
      }, identity),
    };
  };

  toGetDowntimesRequest(category: string, kind: string, namespace: string, since: number, to: number): BaseRequest {
    return {
      queryParams: pickBy({
        category,
        kind,
        namespace,
        since,
        to,
      }, identity),
    };
  };

  toGetInfrasUptimesRequest(kind: string, interval: UptimeInterval, since: number, to: number): BaseRequest {
    return {
      queryParams: pickBy({
        kind,
        interval: UptimeInterval[interval],
        since,
        to,
      }, identity),
    };
  };
}
