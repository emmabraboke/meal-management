import { Controller, Get } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller('')
@ApiExcludeController()
export class AppController {
  @Get()
  welcome() {
    return 'Welcome to Meal Management API';
  }
}
