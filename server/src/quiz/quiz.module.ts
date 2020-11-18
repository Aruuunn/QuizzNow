import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QaModule } from 'src/qa/qa.module';
import { QaService } from 'src/qa/qa.service';
import { UserModule } from 'src/user/user.module';
import { QuizAttemptGateway } from './quiz-attempt.gateway';
import { QuizController } from './quiz.controller';
import QuizRepository from './quiz.repository';
import { QuizService } from './quiz.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuizRepository]),UserModule,QaModule],
  controllers: [QuizController],
  providers: [QuizService, QaService],
  exports:[QuizService]
})
export class QuizModule {}
