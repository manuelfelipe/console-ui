import {Observable} from 'rxjs/Observable';

import {UserManager} from './user.manager';
import {User} from './user';

class UserManagerMock {
  user: Observable<User> = Observable.throw('UserMgrServiceMock.user unimplemented');

  destroy(): void {
    throw new Error('UserMgrServiceMock.destroy unimplemented');
  }

  updateUser(user: User) {
    throw new Error('UserMgrServiceMock.updateUser unimplemented');
  }

  getUser(): Observable<User> {
    return Observable.throw('UserMgrServiceMock.getUser unimplemented');
  }
}

export const USER_MANAGER_PROVIDER_MOCK = {
  provide: UserManager,
  useClass: UserManagerMock,
};
