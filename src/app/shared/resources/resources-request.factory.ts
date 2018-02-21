import { BaseRequest } from '../base-service/base-request';

export class ResourcesRequestFactory {
  toGetNamespaceResourcesRequest(namespace: string): BaseRequest {
    return {
      params: {
        namespace,
      },
    };
  };

  toGetPodResourcesRequest(cluster: string, namespace: string, pod: string): BaseRequest {
    return {
      params: {
        cluster,
        namespace,
        pod,
      },
    };
  };
}
