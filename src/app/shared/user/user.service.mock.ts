import { UserService } from './user.service';

class UserServiceMock {

  validateUserToken(): void {
    throw new Error('UserServiceMock.validateUserToken unimplemented');
  }

}

export const USER_SERVICE_MOCK_PROVIDER = {
  provide: UserService,
  useClass: UserServiceMock,
};
