import { BaseRequest } from '../base-service/base-request';

export class SonarRequestFactory {
  toGetMetricsRequest(owner: string, name: string, branch: string, metrics: string): BaseRequest {
    return {
      params: {
        owner,
        name,
        branch,
      },
      queryParams: {
        metrics,
      },
    };
  };
}
