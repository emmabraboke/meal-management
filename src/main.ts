import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get('app.port');

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: '*',
    methods: ['POST', 'PUT', 'DELETE', 'GET', 'PATCH'],
  });

  await app.listen(port, () => console.log(`app is running on port ${port}`));
}

bootstrap();
