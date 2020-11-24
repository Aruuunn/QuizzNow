import { Exclude } from 'class-transformer';
import QuestionEntity from 'src/question/question.entity';
import UserEntity from 'src/user/user.entity';
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
    quizAttempt => quizAttempt.quiz,
    { onDelete: 'CASCADE' },
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