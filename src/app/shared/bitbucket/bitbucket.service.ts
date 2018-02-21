import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../config/config.service';
import { BaseService } from '../base-service/base.service';
import { BaseRequest } from '../base-service/base-request';
import { BitbucketProjectsResponse } from './bitbucket-project';
import { BitbucketRepositoriesResponse } from './bitbucket-repository';
import { BitbucketRequestFactory } from './bitbucket-request.factory';
import { UserResponse } from '../user/user-response';
import { Endpoints } from '../base-service/endpoints';

@Injectable()
export class BitbucketService extends BaseService {

  protected serviceDomainUrl: string = this.configService.getConfig('serviceBaseUrl');

  private ENDPOINTS: Endpoints = {
    getAuthorizationUrl: {
      method: 'get',
      path: '/auth/bitbucket/authorizationUrl',
      requiredQueryParams: ['callback'],
    },
    loginCallback: {
      method: 'get',
      path: '/auth/bitbucket/callback',
      requiredQueryParams: ['oauth_token', 'oauth_verifier'],
    },
    getProjects: {
      method: 'get',
      path: '/bitbucket/projects',
    },
    getProjectRepos: {
      method: 'get',
      path: '/bitbucket/projects/:project/repos',
      requiredParams: ['project'],
    },
  };

  constructor(protected http: Http,
              protected configService: ConfigService,
              private bitbucketRequestFactory: BitbucketRequestFactory) {
    super(http, configService);
  }

  login(): void {
    const request = this.bitbucketRequestFactory.toGetAuthorizationUrlRequest(`${window.location.origin}/loginCallback`);

    this.callService(request, this.ENDPOINTS.getAuthorizationUrl)
      .subscribe(url => {
        window.open(url.toString(), '_self');
      }, error => console.error('Error logging to Bitbucket', error.message));
  }

  getProfile(request: BaseRequest): Observable<UserResponse> {
    return this.callService(request, this.ENDPOINTS.loginCallback);
  }

  getProjects(): Observable<BitbucketProjectsResponse> {
    return this.callService({}, this.ENDPOINTS.getProjects);
  }

  getProjectRepos(request: BaseRequest): Observable<BitbucketRepositoriesResponse> {
    return this.callService(request, this.ENDPOINTS.getProjectRepos);
  }

}
