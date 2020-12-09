import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import QuestionEntity from '../../question/question.entity';
import UserEntity from '../../user/user.entity';
import  QuizAttemptEntity  from './quizz_attempts.entity';

@Entity()
export class QuizzEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  quizzId: string;

  @Column()
  quizzTitle: string;

  @Column()
  startDatetime: Date;

  @Column()
  endDatetime: Date;

  @Exclude()
  @ManyToMany(type => QuestionEntity, { eager: true })
  @JoinTable()
  questions: QuestionEntity[];

  @ManyToOne(
    type => UserEntity,
    user => user.userCreatedQuizzes,
    { onDelete: 'CASCADE' },
  )
  createdBy: UserEntity;

  @Exclude()
  @OneToMany(
    type => QuizAttemptEntity,
    quizAttempt => quizAttempt.quizz,
  )
  quizzAttemptsByUsers: QuizAttemptEntity[];

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;
}


export default QuizzEntity;