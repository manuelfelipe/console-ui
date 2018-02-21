import { BaseRequest } from '../base-service/base-request';

export class BitbucketRequestFactory {
  toGetAuthorizationUrlRequest(callback: string): BaseRequest {
    return {
      queryParams: {
        callback,
      },
    };
  };

  toGetProfileRequest(oauth_token: string, oauth_verifier: string): BaseRequest {
    return {
      queryParams: {
        oauth_token,
        oauth_verifier,
      },
    };
  };

  toGetProjectReposRequest(project: string, inactiveOnly: boolean = false): BaseRequest {
    return {
      params: {
        project,
      },
      queryParams: {
        inactiveOnly,
      }
    };
  };
}
