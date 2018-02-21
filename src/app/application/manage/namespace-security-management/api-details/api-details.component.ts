import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { forOwn, isEmpty, isPlainObject } from 'lodash';
import { Api } from '../../../../shared/kong/api/api';
import { KongService } from '../../../../shared/kong/kong.service';
import { KongRequestFactory } from '../../../../shared/kong/kong-request.factory';
import { KongResponseFactory } from '../../../../shared/kong/kong-response.factory';

@Component({
  selector: 'app-api-details',
  templateUrl: './api-details.component.html'
})
export class ApiDetailsComponent implements OnChanges {

  @Input() namespace;
  api: Api;

  erred = false;
  isLoading = false;

  constructor(private kongService: KongService,
              private kongRequestFactory: KongRequestFactory,
              private kongResponseFactory: KongResponseFactory) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.namespace && this.namespace) {

      // reset API and error state
      this.api = null;
      this.erred = false;

      // fetch new API
      const request = this.kongRequestFactory.toGetApiByIdRequest(this.namespace);

      this.isLoading = true;
      this.kongService.getApiById(request).first()
        .map(response => this.kongResponseFactory.toApi(response))
        .finally(() => this.isLoading = false)
        .subscribe(api => {

          // for some reason, Kong sets empty strings on Array types as {}
          forOwn(api, (value, key) => {
            if (isPlainObject(value) && isEmpty(value)) {
              api[key] = '';
            }
          });

          this.api = api;
        }, () => this.erred = true);
    }
  }
}
