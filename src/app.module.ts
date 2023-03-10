import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { BrandModule } from './modules/brand/brand.module';
import { AddonsModule } from './modules/addons/addons.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { SecurityUtilService } from './services/securityUtil.service';
import { AppController } from './app.controller';
import { BrandService } from './modules/brand/brand.service';
import { AuthMiddleware } from './common/middlewares/auth.middleware';

@Module({
  imports: [
    UserModule,
    BrandModule,
    AddonsModule,
    DatabaseModule,
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [SecurityUtilService, BrandService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        {
          path: '/',
          method: RequestMethod.ALL,
        },
        {
          path: 'user',
          method: RequestMethod.ALL,
        },

        {
          path: 'user/login',
          method: RequestMethod.ALL,
        },
      )
      .forRoutes('*');
  }
}
