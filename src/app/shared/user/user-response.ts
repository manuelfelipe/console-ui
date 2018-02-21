export interface UserResponse {
  username: string;
  name: string;
  email: string;
  avatar: string;
  isActive: boolean;
  token?: string;
}
