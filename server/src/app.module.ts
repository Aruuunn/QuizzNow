import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

import * as env from '../config/env';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: env.POSTGRES_HOST ,
    port:parseInt(env.POSTGRES_PORT),
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DATABASE,
    entities: ['dist/**/*.entity{.js,.ts}'],
    synchronize: true,
  }), AuthModule, UserModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, UserService],
})
export class AppModule {}
