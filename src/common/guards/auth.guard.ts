import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    let token: any;
    if (
      request.headers.authorization &&
      request.headers.authorization.startsWith('Bearer')
    ) {
      token = request?.headers?.authorization.split(' ')[1];
    }

    if (!token) {
      throw new UnauthorizedException(
        'You are not logged in. Please login to access this resource!',
      );
    }

    return token;
  }
}
