import { BaseRequest } from '../base-service/base-request';

export class ProjectRequestFactory {
  toGetProjectByNamespaceRequest(namespace: string): BaseRequest {
    return {
      params: {
        namespace,
      },
    };
  };

  toSearchProjectsRequest(query: string): BaseRequest {
    return {
      params: {
        query: query ? encodeURIComponent(query) : null,
      },
    };
  };
}
