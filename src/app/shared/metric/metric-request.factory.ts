import { BaseRequest } from '../base-service/base-request';

export class MetricRequestFactory {
  toGetLatestMetricRequest(type: string): BaseRequest {
    return {
      params: {
        type,
      },
    };
  };
}
