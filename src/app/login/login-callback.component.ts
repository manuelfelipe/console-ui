import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { get } from 'lodash';
import { UserManager } from '../shared/user/user.manager';
import { BitbucketService } from '../shared/bitbucket/bitbucket.service';
import { ParamsService } from '../shared/params/params.service';
import { UserResponseFactory } from '../shared/user/user-response.factory';
import { BitbucketRequestFactory } from '../shared/bitbucket/bitbucket-request.factory';

@Component({
  template: '',
})
export class LoginCallbackComponent implements OnInit {

  constructor(private paramsService: ParamsService,
              private router: Router,
              private bitbucketService: BitbucketService,
              private bitbucketRequestFactory: BitbucketRequestFactory,
              private userResponseFactory: UserResponseFactory,
              private userManager: UserManager) {
  }

  ngOnInit() {
    this.paramsService.getParams()
      .filter(params => !!params['oauth_token'] && !!params['oauth_verifier'])
      .mergeMap(params => {
        const oauthToken = params['oauth_token'];
        const oauthVerifier = params['oauth_verifier'];
        const request = this.bitbucketRequestFactory.toGetProfileRequest(oauthToken, oauthVerifier);

        return this.bitbucketService.getProfile(request);
      })
      .do(user => localStorage.setItem('thecloud.token', get(user, 'token', null)))
      .map(response => this.userResponseFactory.toUser(response))
      .subscribe(user => {
        this.userManager.updateUser(user);
        this.router.navigate(['/']);
      }, error => console.error(error));
  }
}
