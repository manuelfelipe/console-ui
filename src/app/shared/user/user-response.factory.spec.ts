import { TestBed } from '@angular/core/testing';
import { UserResponseFactory } from './user-response.factory';
import { User } from './user';
import { USER } from './user.data';

describe('UserResponseFactory Tests', () => {
  let responseFactory: UserResponseFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserResponseFactory,
      ],
    });
  });

  beforeEach(() => {
    responseFactory = new UserResponseFactory();
  });

  it('should be instantiable', () => {
    expect(responseFactory).toBeDefined();
  });

  describe('fromGetProfileToUser', () => {
    it('should return nulls when nulls are passed', () => {
      const response = responseFactory.toUser(null);
      expect(response).toBeNull();
    });

    it('should return correct response', () => {
      const EXPECTED: User = {
        username: 'mmassou1',
        email: 'mark@pj.ca',
        name: 'Mark Massoud',
        avatar: 'https://git.thecloud.com/users/mmassou1/avatar.png',
        isActive: true,
      };

      const response = responseFactory.toUser(USER);
      expect(response).toEqual(EXPECTED);
    });
  });

});
