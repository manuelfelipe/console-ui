import { Observable } from 'rxjs/Observable';
import { BaseRequest } from '../base-service/base-request';
import { UserResponse } from '../user/user-response';
import { BitbucketService } from './bitbucket.service';
import { BitbucketProjectsResponse } from './bitbucket-project';
import { BitbucketRepositoriesResponse } from './bitbucket-repository';

class BitbucketServiceMock {

  login(): void {
    throw new Error('BitbucketServiceMock.login unimplemented');
  }

  getProfile(request: BaseRequest): Observable<UserResponse> {
    return Observable.throw('BitbucketServiceMock.getProfile unimplemented');
  }

  getProjects(): Observable<BitbucketProjectsResponse> {
    return Observable.throw('BitbucketServiceMock.getProjects unimplemented');
  }

  getProjectRepos(request: BaseRequest): Observable<BitbucketRepositoriesResponse> {
    return Observable.throw('BitbucketServiceMock.getProjectRepos unimplemented');
  }

}

export const BITBUCKET_SERVICE_MOCK_PROVIDER = {
  provide: BitbucketService,
  useClass: BitbucketServiceMock,
};
