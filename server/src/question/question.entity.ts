import { Exclude, Transform } from 'class-transformer';
import UserEntity from '../user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class QuestionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  questionId: string;

  @Column()
  questionTitle: string;

  @Column()
  @Exclude()
  correctAnswer: string;

  @Column('text', { array: true })
  multipleChoices: string[];

  @Exclude()
  @ManyToOne(
    type => UserEntity,
    user => user.userCreatedQuestions,
    { onDelete: 'CASCADE' },
  )
  createdBy: UserEntity;
}

export default QuestionEntity;
