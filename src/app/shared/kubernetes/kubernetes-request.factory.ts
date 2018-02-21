import { BaseRequest } from '../base-service/base-request';
import { EventType } from './event/event';

export class KubernetesRequestFactory {

  toGetNamespaceDeploymentsRequest(namespace: string): BaseRequest {
    return {
      params: {
        namespace,
      },
    };
  };

  toGetNamespaceEventsRequest(cluster: string, namespace: string, type?: EventType): BaseRequest {
    const request: BaseRequest = {
      params: {
        cluster,
        namespace,
      },
    };

    if (type) {
      request.queryParams = {
        type: EventType[type],
      };
    }

    return request;
  };

  toGetNamespaceKibanaTrafficDashboardURLRequest(namespace: string, isDarkTheme: boolean = false): BaseRequest {
    return {
      params: {
        namespace,
      },
      queryParams: {
        isDarkTheme,
      },
    };
  };

  toGetNamespaceLabelsRequest(namespace: string): BaseRequest {
    return {
      params: {
        namespace,
      },
    };
  };

  toGetServiceURLRequest(namespace: string): BaseRequest {
    return {
      params: {
        namespace,
      },
    };
  };

  toGetServiceUpstreamURLRequest(namespace: string): BaseRequest {
    return {
      params: {
        namespace,
      },
    };
  };

  toGetServiceConfigMapsRequest(cluster: string, namespace: string): BaseRequest {
    return {
      params: {
        cluster,
        namespace,
      },
    };
  };

  toGetServiceHealthRequest(namespace: string): BaseRequest {
    return {
      params: {
        namespace,
      },
    };
  };

  toGetDeploymentPodsRequest(cluster: string, namespace: string, deployment: string): BaseRequest {
    return {
      params: {
        cluster,
        namespace,
        deployment,
      },
    };
  };

  toPatchDeploymentScaleRequest(cluster: string, namespace: string, deployment: string, scale: number): BaseRequest {
    return {
      params: {
        cluster,
        namespace,
        deployment,
      },
      body: {
        scale,
      },
    };
  };

  toGetPodLogsRequest(cluster: string, namespace: string, pod: string, container: string, previous: boolean = false): BaseRequest {
    return {
      params: {
        cluster,
        namespace,
        pod,
      },
      queryParams: {
        container,
        previous,
      },
    };
  };

  toDeletePodRequest(cluster: string, namespace: string, pod: string): BaseRequest {
    return {
      params: {
        cluster,
        namespace,
        pod,
      },
    };
  };

}
