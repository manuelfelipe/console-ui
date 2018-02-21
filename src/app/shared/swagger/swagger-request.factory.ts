import { BaseRequest } from '../base-service/base-request';

export class SwaggerRequestFactory {
  toGetSwaggerFileRequest(namespace: string): BaseRequest {
    return {
      params: {
        namespace,
      },
    };
  };
}
