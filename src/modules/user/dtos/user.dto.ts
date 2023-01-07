import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    MinLength,
  } from 'class-validator';
  import { Role } from '../../../enum/user/role.enum';
  
  export class UserDto {
    @IsNotEmpty()
    password: string
  }
  