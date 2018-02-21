import { User } from './user';
import { UserResponse } from './user-response';

export class UserResponseFactory {
  toUser(userResponse: UserResponse): User {
    if (!userResponse) {
      return null;
    }

    return {
      username: userResponse.username,
      name: userResponse.name,
      email: userResponse.email,
      avatar: userResponse.avatar,
      isActive: userResponse.isActive,
    };
  };
}
