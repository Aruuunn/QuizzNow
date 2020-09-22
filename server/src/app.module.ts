import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { QaService } from './qa/qa.service';
import { QaModule } from './qa/qa.module';
import { QuizModule } from './quiz/quiz.module';

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
  }), AuthModule, UserModule, QaModule, QuizModule],
  controllers: [ AuthController],
  providers: [ UserService, QaService],
})
export class AppModule {}
