import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { userInfo } from 'os';
import { Role } from 'src/enum/role.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      return false;
    }

    const user = request.user;

    return Role.ADMIN === user.role;
  }
}
