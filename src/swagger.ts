import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Meal Management API')
    .setDescription(
      '#### Meal management application allows users to create, read, update, and delete meal addons.It also allow users to create categories for these addons \n #### Application Base URL- [https://meal-management.onrender.com](https://meal-management.onrender.com)',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
};
