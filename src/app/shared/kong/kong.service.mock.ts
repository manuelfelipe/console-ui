import { Observable } from 'rxjs/Observable';
import { BaseRequest } from '../base-service/base-request';
import { KongService } from './kong.service';
import { ListResponse } from './list-response';
import { ConsumerResponse } from './consumer/consumer-response';
import { PluginResponse } from './plugin/plugin-response';
import { EnabledPlugins } from './enabled-plugins/enabled-plugins';
import { ApiResponse } from './api/api-response';
import { ConsumerPluginConfigResponse } from './consumer-plugin-config/consumer-plugin-config-response';

class KongServiceMock {

  getConsumers(request: BaseRequest): Observable<ListResponse<ConsumerResponse>> {
    throw new Error('KongServiceMock.getConsumers unimplemented');
  }

  getConsumerByUsername(request: BaseRequest): Observable<ConsumerResponse> {
    throw new Error('KongServiceMock.getConsumerByUsername unimplemented');
  }

  getConsumersByNamespace(request: BaseRequest): Observable<ListResponse<ConsumerResponse>> {
    throw new Error('KongServiceMock.getConsumersByNamespace unimplemented');
  }

  getConsumerPluginConfig(request: BaseRequest): Observable<ListResponse<ConsumerPluginConfigResponse>> {
    throw new Error('KongServiceMock.getConsumerPluginConfig unimplemented');
  }

  createConsumerPluginConfig(request: BaseRequest): Observable<ConsumerPluginConfigResponse> {
    throw new Error('KongServiceMock.createConsumerPluginConfig unimplemented');
  }

  deleteConsumerPluginConfig(request: BaseRequest): Observable<null> {
    throw new Error('KongServiceMock.deleteConsumerPluginConfig unimplemented');
  }

  createConsumer(request: BaseRequest): Observable<ConsumerResponse> {
    throw new Error('KongServiceMock.createConsumer unimplemented');
  }

  deleteConsumer(request: BaseRequest): Observable<null> {
    throw new Error('KongServiceMock.deleteConsumer unimplemented');
  }

  getPlugins(request: BaseRequest): Observable<ListResponse<PluginResponse>> {
    throw new Error('KongServiceMock.getPlugins unimplemented');
  }

  getEnabledPlugins(request: BaseRequest): Observable<EnabledPlugins> {
    throw new Error('KongServiceMock.getEnabledPlugins unimplemented');
  }

  getPluginById(request: BaseRequest): Observable<PluginResponse> {
    throw new Error('KongServiceMock.getPluginById unimplemented');
  }

  getPluginSchema(request: BaseRequest): Observable<any> {
    throw new Error('KongServiceMock.getPluginSchema unimplemented');
  }

  getApis(request: BaseRequest): Observable<ListResponse<ApiResponse>> {
    throw new Error('KongServiceMock.getApis unimplemented');
  }

  getApiById(request: BaseRequest): Observable<ApiResponse> {
    throw new Error('KongServiceMock.getApiById unimplemented');
  }

  getApiPlugins(request: BaseRequest): Observable<ListResponse<PluginResponse>> {
    throw new Error('KongServiceMock.getApiPlugins unimplemented');
  }

  addApiPlugin(request: BaseRequest): Observable<PluginResponse> {
    throw new Error('KongServiceMock.addApiPlugin unimplemented');
  }

  updateApiPlugin(request: BaseRequest): Observable<PluginResponse> {
    throw new Error('KongServiceMock.updateApiPlugin unimplemented');
  }

}

export const KONG_SERVICE_MOCK_PROVIDER = {
  provide: KongService,
  useClass: KongServiceMock,
};
