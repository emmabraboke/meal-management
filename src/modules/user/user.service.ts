import {
  Inject,
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { ModelClass } from 'objection';
import { SecurityUtilService } from 'src/services/securityUtil.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { LoginDto } from './dtos/login.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('User') private userRepository: ModelClass<User>,
    private securityUtilService: SecurityUtilService,
  ) {}

  async createUser(createAccountDto: CreateUserDto): Promise<User> {
    const encryptedPassword = await this.securityUtilService.encryptPassword(
      createAccountDto.password,
    );

    const userExit = await this.findUserByEmail(createAccountDto.email);

    if (userExit) {
      throw new BadRequestException('email address exist in database');
    }

    createAccountDto.password = encryptedPassword;

    const user = await this.userRepository.query().insert(createAccountDto);

    return user;
  }

  async login(loginDto: LoginDto): Promise<User> {
    const user = await this.findUserByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('incorrect email or password');
    }

    // check if the client password and user password is thesame
    await this.securityUtilService.verifyPassword(user, loginDto.password);

    const [accessToken, refreshToken] = this.securityUtilService.generateToken(
      user.id,
      user.role,
    );

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;

    await user.$query().patch();

    return user;
  }

  async findUserById(id: string) {
    return await this.userRepository.query().findOne({ id });
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.query().findOne({ email });
  }
}
