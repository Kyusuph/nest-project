import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule, {logger: ['error', 'debug']});
  const port = 3000;
  await app.listen(port);
  logger.log(`Application started and listening at port ${port}`);
}
bootstrap();
