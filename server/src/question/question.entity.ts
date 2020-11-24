import { Exclude, Transform } from 'class-transformer';
import UserEntity from 'src/user/user.entity';
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

  @Transform(options =>
    options.map(
      (o: any) =>
        String.fromCharCode.apply(null, new Uint16Array(o)) ||
        String.fromCharCode.apply(null, new Uint16Array(o.data)),
    ),
  )
  @Column('bytea', { array: true })
  multipleChoices: string[];

  @Exclude()
  @ManyToOne(
    type => UserEntity,
    user => user.userCreatedQuestions,
  )
  createdBy: UserEntity;
}

export default QuestionEntity;
