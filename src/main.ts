import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllExceptionsFilter } from './filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get('app.port');
  const httpRef = app.getHttpAdapter().getHttpServer();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter(httpRef, new Logger()));

  app.enableCors({
    origin: '*',
    methods: ['POST', 'PUT', 'DELETE', 'GET', 'PATCH'],
  });

  await app.listen(port, () => console.log(`app is running on port ${port}`));
}

bootstrap();
