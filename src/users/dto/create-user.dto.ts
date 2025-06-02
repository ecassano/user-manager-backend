import { UserStatus, UserRole } from '../user.entity';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  status?: UserStatus;
  role?: UserRole;
}
