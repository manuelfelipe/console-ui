import { identity, pickBy } from 'lodash';
import { BaseRequest } from '../base-service/base-request';

export type RangeType = 'lt' | 'lte' | 'gt' | 'gte';
export type Order = 'asc' | 'desc';
export type APICatalogEnv = 'dev' | 'qa' | 'prod';

export class ElasticsearchRequestFactory {

  toGetLogsRequest(namespace: string, searchText: string, timestamp: string, rangeType: RangeType, order: Order, lowerBoundTimestamp?: number, upperBoundTimestamp?: number): BaseRequest {
    return {
      params: {
        namespace,
      },
      queryParams: pickBy({
        searchText,
        timestamp,
        rangeType,
        order,
        lowerBoundTimestamp,
        upperBoundTimestamp,
      }, identity),
    };
  };

  toSearchAPICatalogRequest(environment: APICatalogEnv, serviceGroup?: string, searchTerms?: string): BaseRequest {
    return {
      params: {
        environment,
      },
      queryParams: pickBy({
        serviceGroup,
        searchTerms,
      }, identity),
    };
  };

  toGetServiceGroupsRequest(environment: APICatalogEnv): BaseRequest {
    return {
      params: {
        environment,
      },
    };
  };

}
