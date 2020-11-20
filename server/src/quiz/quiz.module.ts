import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QaModule } from 'src/qa/qa.module';
import { QaService } from 'src/qa/qa.service';
import { UserModule } from 'src/user/user.module';
import { QuestionAttemptEntity } from './question_attempt.entity';
import { QuizController } from './quiz.controller';
import QuizRepository from './quiz.repository';
import { QuizService } from './quiz.service';
import { QuizAttemptEntity } from './quiz_attempts.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuizRepository,
      QuizAttemptEntity,
      QuestionAttemptEntity,
    ]),
    UserModule,
    QaModule,
  ],
  controllers: [QuizController],
  providers: [QuizService, QaService],
  exports: [QuizService],
})
export class QuizModule {}
