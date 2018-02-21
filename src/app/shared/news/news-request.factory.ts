import { BaseRequest } from '../base-service/base-request';

export class NewsRequestFactory {
  toGetNewsRequest(limit: number): BaseRequest {
    return {
      queryParams: {
        limit,
      },
    };
  };
}
