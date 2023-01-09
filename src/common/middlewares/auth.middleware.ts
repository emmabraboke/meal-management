import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { SecurityUtilService } from '../../services/securityUtil.service';
import { UserService } from '../../modules/user/user.service';
import { User } from '../../modules/user/entities/user.entity';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private securityUtilService: SecurityUtilService,
    private userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const auth = req?.headers?.authorization;
    let token;

    if (auth && auth.startsWith('Bearer ')) {
      token = auth.split('Bearer ')[1];
    }

    if (!token) {
      throw new UnauthorizedException('User not logged in');
    }

    const claims = this.securityUtilService.validateToken(token);

    const user = await this.userService.findUserById(claims['id']);

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = user;
    next();
  }
}
