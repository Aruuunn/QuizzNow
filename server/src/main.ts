import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  app.use(passport.initialize());

  app.setGlobalPrefix('/api')

  await app.listen(5000);
}
bootstrap();
