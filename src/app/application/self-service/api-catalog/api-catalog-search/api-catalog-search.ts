import { APICatalogEnv } from '../../../../shared/elasticsearch/elasticsearch-request.factory';

export interface APICatalogSearch {
  environment?: APICatalogEnv;
  serviceGroup?: string;
  searchTerms?: string;
}
