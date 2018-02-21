import { Observable } from 'rxjs/Observable';
import { BaseRequest } from '../base-service/base-request';
import { ElasticsearchService } from './elasticsearch.service';
import { APICatalogEntry } from 'app/shared/elasticsearch/api-catalog-entry';
import { APICatalogServiceGroupResponse } from './api-catalog-service-group';
import { Log } from 'app/shared/elasticsearch/log';

class ElasticsearchServiceMock {

  getLogs(request: BaseRequest): Observable<Log[]> {
    throw new Error('ElasticsearchServiceMock.getLogs unimplemented');
  }

  searchAPICatalog(request: BaseRequest): Observable<APICatalogEntry[]> {
    throw new Error('ElasticsearchServiceMock.searchAPICatalog unimplemented');
  }

  getServiceGroups(request: BaseRequest): Observable<APICatalogServiceGroupResponse> {
    throw new Error('ElasticsearchServiceMock.getServiceGroups unimplemented');
  }

}

export const ELASTICSEARCH_SERVICE_MOCK_PROVIDER = {
  provide: ElasticsearchService,
  useClass: ElasticsearchServiceMock,
};
