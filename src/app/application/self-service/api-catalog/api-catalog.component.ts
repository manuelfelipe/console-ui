import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { APICatalogSearch } from './api-catalog-search/api-catalog-search';
import { APICatalogEntry } from '../../../shared/elasticsearch/api-catalog-entry';
import { ElasticsearchService } from '../../../shared/elasticsearch/elasticsearch.service';
import { ElasticsearchRequestFactory } from '../../../shared/elasticsearch/elasticsearch-request.factory';

@Component({
  selector: 'app-api-catalog',
  templateUrl: './api-catalog.component.html',
  styleUrls: ['./api-catalog.component.scss']
})
export class ApiCatalogComponent implements OnInit {

  apis: APICatalogEntry[] = [];
  isLoading = false;

  constructor(private elasticsearchService: ElasticsearchService,
              private elasticsearchRequestFactory: ElasticsearchRequestFactory,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.first()
      .subscribe(params => {
        this.onSearch({
          environment: params.env || 'prod',
          serviceGroup: params.g || '',
          searchTerms: params.q || '',
        });
      });
  }

  onSearch(search: APICatalogSearch): void {
    if (search) {
      const request = this.elasticsearchRequestFactory
        .toSearchAPICatalogRequest(search.environment, search.serviceGroup, search.searchTerms);

      // reset
      this.apis = [];
      this.isLoading = true;

      this.elasticsearchService.searchAPICatalog(request).first()
        .finally(() => this.isLoading = false)
        .subscribe(apis => {
          // apis are already sorted in backend,
          // by serviceGroup, serviceName, namespace
          this.apis = apis;

          const queryParams: Params = {};

          if (search.environment) {
            queryParams.env = search.environment;
          }

          if (search.serviceGroup) {
            queryParams.g = search.serviceGroup;
          }

          if (search.searchTerms) {
            queryParams.q = search.searchTerms;
          }

          // modify queryParams, so we can easily go back to current search, or share the link
          this.router.navigate([], { queryParams });
        });
    }
  }
}
