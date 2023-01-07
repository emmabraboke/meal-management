import { Body, Controller, Get, Post, SerializeOptions } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.unterceptor';
import { CreateUserDto } from './dtos/createUser.dto';
import { LoginDto } from './dtos/login.dto';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @Serialize(UserDto)
  async createUser(@Body() createAccountDto: CreateUserDto) {
    return await this.userService.createUser(createAccountDto);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto);
  }
}
