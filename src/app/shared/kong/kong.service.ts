import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../base-service/base.service';
import { BaseRequest } from '../base-service/base-request';
import { ConfigService } from '../config/config.service';
import { Endpoints } from '../base-service/endpoints';
import { ListResponse } from './list-response';
import { ConsumerResponse } from './consumer/consumer-response';
import { PluginResponse } from './plugin/plugin-response';
import { EnabledPlugins } from './enabled-plugins/enabled-plugins';
import { ApiResponse } from './api/api-response';
import { ConsumerPluginConfigResponse } from './consumer-plugin-config/consumer-plugin-config-response';

@Injectable()
export class KongService extends BaseService {

  protected serviceDomainUrl: string = this.configService.getConfig('serviceBaseUrl');

  private ENDPOINTS: Endpoints = {
    getConsumers: {
      method: 'GET',
      path: '/kong/consumers',
    },
    getConsumerByUsername: {
      method: 'GET',
      path: '/kong/consumers/:username',
      requiredParams: ['username'],
    },
    getConsumersByNamespace: {
      method: 'GET',
      path: '/kong/consumers/namespace/:namespace',
      requiredParams: ['namespace'],
    },
    getConsumerPluginConfig: {
      method: 'GET',
      path: '/kong/consumers/:username/:pluginName',
      requiredParams: ['username', 'pluginName'],
    },
    createConsumerPluginConfig: {
      method: 'POST',
      path: '/kong/consumers/:username/:pluginName',
      requiredParams: ['username', 'pluginName'],
      requiredBody: ['namespace'],
    },
    deleteConsumerPluginConfig: {
      method: 'DELETE',
      path: '/kong/consumers/:username/:pluginName/:configId',
      requiredParams: ['username', 'pluginName', 'configId'],
    },
    createConsumer: {
      method: 'POST',
      path: '/kong/consumers',
      requiredBody: ['username'],
    },
    deleteConsumer: {
      method: 'DELETE',
      path: '/kong/consumers/:username',
      requiredParams: ['username'],
    },
    getPlugins: {
      method: 'GET',
      path: '/kong/plugins',
    },
    getEnabledPlugins: {
      method: 'GET',
      path: '/kong/plugins/enabled',
    },
    getPluginById: {
      method: 'GET',
      path: '/kong/plugins/:id',
      requiredParams: ['id'],
    },
    getPluginSchema: {
      method: 'GET',
      path: '/kong/plugins/:name/schema',
      requiredParams: ['name'],
    },
    getApis: {
      method: 'GET',
      path: '/kong/apis',
    },
    getApiById: {
      method: 'GET',
      path: '/kong/apis/:id',
      requiredParams: ['id'],
    },
    getApiPlugins: {
      method: 'GET',
      path: '/kong/apis/:id/plugins',
      requiredParams: ['id'],
    },
    addApiPlugin: {
      method: 'POST',
      path: '/kong/apis/:id/plugins',
      requiredParams: ['id'],
      requiredBody: ['name', 'config'],
    },
    updateApiPlugin: {
      method: 'PUT',
      path: '/kong/apis/:id/plugins',
      requiredParams: ['id'],
      requiredBody: ['id', 'name', 'config'],
    },
  };

  constructor(protected http: Http,
              protected configService: ConfigService) {
    super(http, configService);
  }

  getConsumers(request: BaseRequest): Observable<ListResponse<ConsumerResponse>> {
    return this.callService(request, this.ENDPOINTS.getConsumers);
  }

  getConsumerByUsername(request: BaseRequest): Observable<ConsumerResponse> {
    return this.callService(request, this.ENDPOINTS.getConsumerByUsername);
  }

  getConsumersByNamespace(request: BaseRequest): Observable<ListResponse<ConsumerResponse>> {
    return this.callService(request, this.ENDPOINTS.getConsumersByNamespace);
  }

  getConsumerPluginConfig(request: BaseRequest): Observable<ListResponse<ConsumerPluginConfigResponse>> {
    return this.callService(request, this.ENDPOINTS.getConsumerPluginConfig);
  }

  createConsumerPluginConfig(request: BaseRequest): Observable<ConsumerPluginConfigResponse> {
    return this.callService(request, this.ENDPOINTS.createConsumerPluginConfig);
  }

  deleteConsumerPluginConfig(request: BaseRequest): Observable<null> {
    return this.callService(request, this.ENDPOINTS.deleteConsumerPluginConfig);
  }

  createConsumer(request: BaseRequest): Observable<ConsumerResponse> {
    return this.callService(request, this.ENDPOINTS.createConsumer);
  }

  deleteConsumer(request: BaseRequest): Observable<null> {
    return this.callService(request, this.ENDPOINTS.deleteConsumer);
  }

  getPlugins(): Observable<ListResponse<PluginResponse>> {
    return this.callService({}, this.ENDPOINTS.getPlugins);
  }

  getEnabledPlugins(): Observable<EnabledPlugins> {
    return this.callService({}, this.ENDPOINTS.getEnabledPlugins);
  }

  getPluginById(request: BaseRequest): Observable<PluginResponse> {
    return this.callService(request, this.ENDPOINTS.getPluginById);
  }

  getPluginSchema(request: BaseRequest): Observable<any> {
    return this.callService(request, this.ENDPOINTS.getPluginSchema);
  }

  getApis(): Observable<ListResponse<ApiResponse>> {
    return this.callService({}, this.ENDPOINTS.getApis);
  }

  getApiById(request: BaseRequest): Observable<ApiResponse> {
    return this.callService(request, this.ENDPOINTS.getApiById);
  }

  getApiPlugins(request: BaseRequest): Observable<ListResponse<PluginResponse>> {
    return this.callService(request, this.ENDPOINTS.getApiPlugins);
  }

  addApiPlugin(request: BaseRequest): Observable<PluginResponse> {
    return this.callService(request, this.ENDPOINTS.addApiPlugin);
  }

  updateApiPlugin(request: BaseRequest): Observable<PluginResponse> {
    return this.callService(request, this.ENDPOINTS.updateApiPlugin);
  }
}
