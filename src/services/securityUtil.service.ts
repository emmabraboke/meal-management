import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../modules/user/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SecurityUtilService {
  constructor(private configService: ConfigService) {}
  async encryptPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(password, salt);

    return encryptedPassword;
  }

  async verifyPassword(user: User, password: string) {
    try {
      const userPassword = user?.password;

      //checks if userPassword and password are the same
      const isMatch = bcrypt.compare(password, userPassword);

      if (!isMatch) {
        throw new UnauthorizedException(
          'Password or email address is incorrect',
        );
      }
    } catch (error) {
      throw error;
    }
  }

  generateToken(id: string, role = 'USER'): string[] {
    const accessToken = jwt.sign(
      { id, role },
      this.configService.get('app.secret'),
      {
        expiresIn: this.configService.get('app.accessTokenExpiresIn'),
      },
    );
    const refreshToken = jwt.sign(
      { id, role },
      this.configService.get('app.secret'),
      {
        expiresIn: this.configService.get('app.refreshTokenExpiresIn'),
      },
    );

    return [refreshToken, accessToken];
  }

  validateToken(token: any) {
    return jwt.verify(token, this.configService.get('app.secret'));
  }
}
