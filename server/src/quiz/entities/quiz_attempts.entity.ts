import UserEntity from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuizEntity } from './quiz.entity';
import { QuestionAttemptEntity } from './question_attempt.entity';

@Entity()
export class QuizAttemptEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    type => QuizEntity,
    quiz => quiz.attempts,
    { eager: true, onDelete: 'CASCADE' },
  )
  quiz: QuizEntity;

  @ManyToOne(
    type => UserEntity,
    user => user.attempts,
  )
  user: UserEntity;

  @OneToMany(
    type => QuestionAttemptEntity,
    questionAttempt => questionAttempt.attempt,
    { onDelete: 'CASCADE',eager:true },
  )
  questionAttempts: QuestionAttemptEntity[];

  @Column({ default: 0 })
  totalScore: number;

  @Column({ default: false })
  attemptFinished: boolean;
}
