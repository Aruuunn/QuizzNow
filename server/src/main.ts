import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  dotenv.config();
  
  const app = await NestFactory.create(AppModule);

  app.use(passport.initialize());

  app.setGlobalPrefix('/api');

  app.enableCors();

  const options = new DocumentBuilder().setTitle('QuizzNow Api').build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('_api', app, document);

  await app.listen(5000);
}
bootstrap();
