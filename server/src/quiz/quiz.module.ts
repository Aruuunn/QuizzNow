import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizController } from './quiz.controller';
import QuizRepository from './quiz.repository';
import { QuizService } from './quiz.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuizRepository])],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
