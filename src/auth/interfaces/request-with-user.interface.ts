import { UserRole } from '../../users/user.entity';

export interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
  };
}
