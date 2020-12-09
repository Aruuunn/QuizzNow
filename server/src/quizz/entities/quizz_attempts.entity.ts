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
import { Exclude } from 'class-transformer';

@Entity()
export class QuizzAttemptEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  quizzAttemptId: string;

  @Exclude()
  @ManyToOne(
    type => QuizzEntity,
    quiz => quiz.quizzAttemptsByUsers,
    { eager: true,nullable:false ,onDelete:'CASCADE'},
  )
  quizz: QuizzEntity;

  @Exclude()
  @ManyToOne(
    type => UserEntity,
    user => user.userQuizAttempts,
  )
  user: UserEntity;

  @Exclude()
  @OneToMany(
    type => QuestionAttemptEntity,
    questionAttempt => questionAttempt.quizAttempt,
    { onDelete: 'CASCADE',eager:true },
  )
  questionAttempts: QuestionAttemptEntity[];

  @Column({ default: 0 })
  totalScore: number;

  @Exclude()
  @Column({ default: false })
  attemptFinished: boolean;
}

export default QuizzAttemptEntity;