import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SwaggerConstant } from '../../common/constants/swagger.constant';
import { Serialize } from '../../common/interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/createUser.dto';
import { LoginDto } from './dtos/login.dto';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@ApiTags('Auth')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation(SwaggerConstant.createUser)
  @Post()
  @Serialize(UserDto)
  async createUser(@Body() createAccountDto: CreateUserDto) {
    return await this.userService.createUser(createAccountDto);
  }

  @ApiOperation(SwaggerConstant.logIn)
  @Post('/login')
  @Serialize(UserDto)
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto);
  }
}
