import QAEntity from 'src/qa/qa.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuizAttemptEntity } from './quiz_attempts.entity';

@Entity()
export class QuestionAttemptEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column('uuid')
  questionId: string;

  @ManyToOne(
    type => QuizAttemptEntity,
    quizAttempt => quizAttempt.questionAttempts,
    { onDelete: 'CASCADE' },
  )
  attempt: QuizAttemptEntity;

  @Column()
  optionChoosed: number;
}
