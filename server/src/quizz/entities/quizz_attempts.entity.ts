import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuizzEntity } from './quizz.entity';
import { QuestionAttemptEntity } from './question_attempt.entity';
import UserEntity from '../../user/user.entity';

@Entity()
export class QuizzAttemptEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  quizzAttemptId: string;

  @ManyToOne(
    type => QuizzEntity,
    quiz => quiz.quizzAttemptsByUsers,
    { eager: true, onDelete: 'CASCADE' },
  )
  quiz: QuizzEntity;

  @ManyToOne(
    type => UserEntity,
    user => user.userAttemptedQuizzes,
  )
  user: UserEntity;

  @OneToMany(
    type => QuestionAttemptEntity,
    questionAttempt => questionAttempt.quizAttempt,
    { onDelete: 'CASCADE',eager:true },
  )
  questionAttempts: QuestionAttemptEntity[];

  @Column({ default: 0 })
  totalScore: number;

  @Column({ default: false })
  attemptFinished: boolean;
}

export default QuizzAttemptEntity;