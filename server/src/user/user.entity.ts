import { Exclude } from 'class-transformer';
import QAEntity from '../question/question.entity';
import { QuizzEntity } from '../quizz/entities/quizz.entity';
import { QuizzAttemptEntity} from '../quizz/entities/quizz_attempts.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from 'typeorm';

@Entity()
class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column()
  userName: string;

  @Exclude()
  @Index()
  @Column({ unique: true })
  userEmail: string;

  @Column({ nullable: true })
  userPhotoURL: string;

  @OneToMany(
    type => QuizzEntity,
    quiz => quiz.createdBy,
  )
  userCreatedQuizzes: QuizzEntity[];

  @Exclude()
  @OneToMany(
    type => QuizzAttemptEntity,
    quizAttempt => quizAttempt.user,
    { eager: true },
  )
  userQuizAttempts: QuizzAttemptEntity[];

  @OneToMany(
    type => QAEntity,
    qa => qa.createdBy,
  )
  userCreatedQuestions: QAEntity[];
}

export default UserEntity;
