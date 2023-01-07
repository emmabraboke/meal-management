import { Model } from 'objection';
import { Role } from '../../../enum/user/role.enum';

export class User extends Model {
  static tableName = 'users';
  readonly id: string;
  firstName: string;
  email: string;
  lastName: string;
  password: string;
  role: Role;
  refreshToken: string;
  accessToken: string;
}
