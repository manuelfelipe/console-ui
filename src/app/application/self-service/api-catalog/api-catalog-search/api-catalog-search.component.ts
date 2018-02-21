import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { APICatalogSearch } from './api-catalog-search';
import {
  APICatalogEnv,
  ElasticsearchRequestFactory
} from '../../../../shared/elasticsearch/elasticsearch-request.factory';
import { APICatalogServiceGroupResponse } from '../../../../shared/elasticsearch/api-catalog-service-group';
import { ElasticsearchService } from '../../../../shared/elasticsearch/elasticsearch.service';

@Component({
  selector: 'app-api-catalog-search',
  templateUrl: './api-catalog-search.component.html'
})
export class ApiCatalogSearchComponent implements OnInit, OnDestroy {

  selectedEnvironment: APICatalogEnv = 'prod';
  serviceGroups: APICatalogServiceGroupResponse = {
    total: 0,
    serviceGroups: [],
  };

  formGroup: FormGroup;

  @Output() search: EventEmitter<APICatalogSearch> = new EventEmitter<APICatalogSearch>();

  sub: Subscription;
  envSub: Subscription;

  constructor(private elasticsearchService: ElasticsearchService,
              private elasticsearchRequestFactory: ElasticsearchRequestFactory,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      environment: [this.selectedEnvironment, Validators.required],
      serviceGroup: '',
      searchTerms: '',
    });

    // we subscribe to the `environment` the first thing
    this.envSub = this.formGroup.get('environment').valueChanges
      .map(env => this.elasticsearchRequestFactory.toGetServiceGroupsRequest(env))
      .mergeMap(request => this.elasticsearchService.getServiceGroups(request))
      .subscribe(serviceGroups => this.serviceGroups = serviceGroups);

    this.activatedRoute.queryParams.first()
      .subscribe(params => {

        // only if we have a valid env (prod | qa | dev)
        if (params.env || this.selectedEnvironment) {
          this.formGroup.patchValue({ environment: params.env || this.selectedEnvironment });
        }

        if (params.g) {
          this.formGroup.patchValue({ serviceGroup: params.g });
        }

        if (params.q) {
          this.formGroup.patchValue({ searchTerms: params.q });
        }
      });

    this.sub = this.formGroup.valueChanges
      .debounceTime(200)
      .subscribe(values => {
        this.search.emit({
          environment: values.environment,
          serviceGroup: values.serviceGroup,
          searchTerms: values.searchTerms,
        });
      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    if (this.envSub) {
      this.envSub.unsubscribe();
    }
  }
}
