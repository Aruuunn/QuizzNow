import { Exclude } from 'class-transformer';
import QAEntity from 'src/qa/qa.entity';
import { QuizEntity } from 'src/quiz/entities/quiz.entity';
import { QuizAttemptEntity } from 'src/quiz/entities/quiz_attempts.entity';
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
  id: string;

  @Column()
  name: string;

  @Exclude()
  @Index()
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  photoURL: string;

  @OneToMany(
    type => QuizEntity,
    quiz => quiz.createdBy,
  )
  quizzes: QuizEntity[];

  @Exclude()
  @OneToMany(
    type => QuizAttemptEntity,
    quizAttempt => quizAttempt.user,
    { eager: true },
  )
  attempts: QuizAttemptEntity[];

  @OneToMany(
    type => QAEntity,
    qa => qa.createdBy,
  )
  createdQuestions: QAEntity[];
}

export default UserEntity;
