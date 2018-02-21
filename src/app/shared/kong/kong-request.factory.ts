import { identity, pickBy } from 'lodash';
import { BaseRequest } from '../base-service/base-request';

export class KongRequestFactory {

  toGetConsumersRequest(username: string): BaseRequest {
    return {
      queryParams: {
        username,
      },
    };
  };

  toGetConsumerByUsernameRequest(username: string): BaseRequest {
    return {
      params: {
        username,
      },
    };
  };

  toGetConsumersByNamespaceRequest(namespace: string): BaseRequest {
    return {
      params: {
        namespace,
      },
    };
  };

  toGetConsumerPluginConfigRequest(username: string, pluginName: string): BaseRequest {
    return {
      params: {
        username,
        pluginName,
      },
    };
  };

  toCreateConsumerPluginConfigRequest(username: string, pluginName: string, namespace: string, config: any): BaseRequest {
    return {
      params: {
        username,
        pluginName,
      },
      // If there's no value, don't create a key for it,
      // Kong can generate keys/passwords when none provided
      body: {
        namespace: namespace,
        config: pickBy(config, identity),
      },
    };
  };

  toDeleteConsumerPluginConfigRequest(username: string, pluginName: string, configId: string): BaseRequest {
    return {
      params: {
        username,
        pluginName,
        configId
      },
    };
  };

  toCreateConsumerRequest(username: string): BaseRequest {
    return {
      body: {
        username,
      },
    };
  };

  toDeleteConsumerRequest(username: string): BaseRequest {
    return {
      params: {
        username,
      },
    };
  };

  toGetPluginByIdRequest(id: string): BaseRequest {
    return {
      params: {
        id,
      },
    };
  };

  toGetPluginSchemaRequest(name: string): BaseRequest {
    return {
      params: {
        name,
      },
    };
  };

  toGetApiByIdRequest(id: string): BaseRequest {
    return {
      params: {
        id,
      },
    };
  };

  toGetApiPluginsRequest(id: string): BaseRequest {
    return {
      params: {
        id,
      },
    };
  };

  toAddApiPluginRequest(apiId: string, name: string, config: any): BaseRequest {
    return {
      params: {
        id: apiId,
      },
      body: {
        name,
        config: pickBy(config, identity),
      },
    };
  };

  toUpdateApiPluginRequest(apiId: string, pluginId: string, name: string, config: any, enabled: boolean): BaseRequest {
    return {
      params: {
        id: apiId,
      },
      body: {
        id: pluginId,
        name,
        config: pickBy(config, identity),
        enabled,
      },
    };
  };
}
