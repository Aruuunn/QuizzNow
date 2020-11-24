import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from 'src/question/question.module';
import { UserModule } from 'src/user/user.module';
import { QuestionAttemptEntity } from './entities/question_attempt.entity';
import { QuizController } from './quizz.controller';
import { QuizzService } from './quizz.service';
import { QuizzAttemptEntity } from './entities/quizz_attempts.entity';
import QuizzEntity from './entities/quizz.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuizzEntity,
      QuizzAttemptEntity,
      QuestionAttemptEntity,
    ]),
    UserModule,
    QuestionModule,
  ],
  controllers: [QuizController],
  providers: [QuizzService],
  exports: [QuizzService],
})
export class QuizzModule {}
