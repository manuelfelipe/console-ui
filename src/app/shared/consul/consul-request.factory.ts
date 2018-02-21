import { BaseRequest } from '../base-service/base-request';

export class ConsulRequestFactory {

  toGetKeysRequest(key: string): BaseRequest {
    return {
      params: {
        key,
      },
    };
  };

  toGetValuesRequest(key: string): BaseRequest {
    return {
      params: {
        key,
      },
    };
  };

  toSetConfigRequest(configKey: string, configValue: any): BaseRequest {
    return {
      params: {
        key: configKey,
      },
      body: {
        config: configValue,
      },
    };
  };

  toDeleteConfigRequest(configKey: string): BaseRequest {
    return {
      params: {
        key: configKey,
      },
    };
  };

}
