import { Module } from '@nestjs/common';
import { SecurityUtilService } from 'src/services/securityUtil.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, SecurityUtilService],
  exports: [UserService],
})
export class UserModule {}
