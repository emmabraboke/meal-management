import { Expose } from 'class-transformer';

import { Role } from '../../../common/enum/role.enum';

export class UserDto {
  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  role: Role;

  @Expose()
  refreshToken: string;

  @Expose()
  accessToken: string;
}
