import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import  QuizzAttemptEntity  from './quizz_attempts.entity';

@Entity()
export class QuestionAttemptEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  questionAttemptId: string;
  
  @Column('uuid')
  questionId: string;

  @ManyToOne(
    type => QuizzAttemptEntity,
    quizAttempt => quizAttempt.questionAttempts,
    { onDelete: 'CASCADE' },
  )
  quizAttempt: QuizzAttemptEntity;

  @Column()
  optionChoosed: string;
}


export default QuestionAttemptEntity;