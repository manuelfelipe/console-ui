import { RequestMethod } from '@angular/http';
import { lowerCase, merge, omit, startCase } from 'lodash';
import { Api } from './api/api';
import { ApiResponse } from './api/api-response';
import { Consumer } from './consumer/consumer';
import { ConsumerResponse } from './consumer/consumer-response';
import { Plugin } from './plugin/plugin';
import { PluginResponse } from './plugin/plugin-response';
import { Schema, SchemaField, SchemaFieldType } from './plugin/schema';
import { SchemaResponse } from './plugin/schema-response';
import { ConsumerPluginConfig } from './consumer-plugin-config/consumer-plugin-config';
import { ConsumerPluginConfigResponse } from './consumer-plugin-config/consumer-plugin-config-response';

export class KongResponseFactory {
  toApi(apiResponse: ApiResponse): Api {
    if (!apiResponse) {
      return null;
    }

    return {
      id: apiResponse.id,
      name: apiResponse.name,
      hosts: apiResponse.hosts,
      uris: apiResponse.uris,
      methods: Array.isArray(apiResponse.methods) ? apiResponse.methods.map(method => RequestMethod[startCase(lowerCase(method))]) : [],
      upstreamUrl: apiResponse.upstream_url,
      createdAt: new Date(apiResponse.created_at),
    };
  };

  toApis(apis: ApiResponse[]): Api[] {
    if (!apis) {
      return [];
    }

    return apis.map(api => this.toApi(api));
  };

  toConsumer(consumerResponse: ConsumerResponse): Consumer {
    if (!consumerResponse) {
      return null;
    }

    return {
      id: consumerResponse.id,
      username: consumerResponse.username,
      customId: consumerResponse.custom_id,
      createdAt: new Date(consumerResponse.created_at),
    };
  };

  toConsumerPluginConfig(pluginConfigResponse: ConsumerPluginConfigResponse): ConsumerPluginConfig {
    if (!pluginConfigResponse) {
      return null;
    }

    const basePluginConfig: ConsumerPluginConfig = {
      id: pluginConfigResponse.id,
      consumerId: pluginConfigResponse.consumer_id,
      createdAt: new Date(pluginConfigResponse.created_at),
    };

    // drop properties already mapped in basePluginConfig, to merge the rest
    const trimmedPluginConfigResponse = omit(pluginConfigResponse, ['id', 'consumer_id', 'created_at']);

    return merge(basePluginConfig, trimmedPluginConfigResponse);
  };

  toConsumerPluginConfigs(pluginConfigs: ConsumerPluginConfigResponse[]): ConsumerPluginConfig[] {
    if (!pluginConfigs) {
      return [];
    }

    return pluginConfigs.map(pluginConfig => this.toConsumerPluginConfig(pluginConfig));
  };

  toConsumers(consumers: ConsumerResponse[]): Consumer[] {
    if (!consumers) {
      return [];
    }

    return consumers.map(consumer => this.toConsumer(consumer));
  };

  toPlugin(pluginResponse: PluginResponse): Plugin {
    if (!pluginResponse) {
      return null;
    }

    return {
      id: pluginResponse.id,
      apiId: pluginResponse.api_id,
      consumerId: pluginResponse.consumer_id,
      name: pluginResponse.name,
      config: pluginResponse.config,
      enabled: pluginResponse.enabled,
      createdAt: new Date(pluginResponse.created_at),
    };
  };

  toPlugins(plugins: PluginResponse[]): Plugin[] {
    if (!plugins) {
      return [];
    }

    return plugins.map(plugin => this.toPlugin(plugin));
  };

  toSchema(schemaResponse: SchemaResponse): Schema {
    if (!schemaResponse) {
      return null;
    }

    const schemaFields: { [key: string]: SchemaField } = {};
    const fieldsKeys = Object.keys(schemaResponse.fields);

    fieldsKeys.forEach(fieldsKey => {
      const fieldKeys = Object.keys(schemaResponse.fields[fieldsKey]);
      schemaFields[fieldsKey] = {} as SchemaField;

      fieldKeys.forEach(fieldKey => {
        if (fieldKey === 'type') {
          schemaFields[fieldsKey].type = SchemaFieldType[schemaResponse.fields[fieldsKey].type];
        } else if (fieldKey === 'regex') {
          schemaFields[fieldsKey].regex = new RegExp(schemaResponse.fields[fieldsKey].regex);
        } else {
          schemaFields[fieldsKey][fieldKey] = schemaResponse.fields[fieldsKey][fieldKey];
        }
      });
    });

    return {
      fields: schemaFields,
      noConsumer: schemaResponse.no_consumer || false,
      description: schemaResponse.description,
    };
  };
}
