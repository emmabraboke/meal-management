import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  welcome() {
    return 'Welcome to Meal Management API';
  }
}
