import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as dotenv from 'dotenv';
import * as redisConnect from 'connect-redis';
import * as redis  from 'redis';

let RedisStore = redisConnect(session);
let redisClient = redis.createClient({
  host:process.env.REDIS_SESSION_STORE_HOST,
  port:parseInt(process.env.REDIS_SESSION_STORE_PORT),
  connect_timeout:1000,
})

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave:false,
      saveUninitialized:true,
      store: new RedisStore({ client: redisClient }),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.setGlobalPrefix('/api')

  await app.listen(5000);
}
bootstrap();
