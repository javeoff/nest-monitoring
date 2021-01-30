import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from "body-parser";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(bodyParser.urlencoded({ extended: true }))
  await app.listen(3000);
}
bootstrap();
