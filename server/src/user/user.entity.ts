import { Exclude } from 'class-transformer';
import QAEntity from 'src/qa/qa.entity';
import { QuizEntity } from 'src/quiz/quiz.entity';
import { QuizAttemptEntity } from 'src/quiz/quiz_attempts.entity';
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

  @OneToMany(
    type => QuizAttemptEntity,
    quizAttempt => quizAttempt.user,
  )
  attempts: QuizAttemptEntity[];

  @OneToMany(
    type => QAEntity,
    qa => qa.author,
  )
  createdQuestions: QAEntity[];
}

export default UserEntity;
