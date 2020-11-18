import { Exclude } from 'class-transformer';
import UserEntity from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class QAEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question: string;

  @Column()
  @Exclude()
  correctAnswer: number;

  @Column('bytea', { array: true })
  answers: string[];

  @ManyToOne(
    type => UserEntity,
    user => user.createdQuestions,
  )
  author: UserEntity;
}

export default QAEntity;
