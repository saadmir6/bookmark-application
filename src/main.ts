/* eslint-disable prettier/prettier */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist : true  // STRIPS OUT THE UNDEFINED ENTITIES
    }
  )) // FOR VALIDATING THE INCOMING DATA
  await app.listen(3000);
}
bootstrap();
