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
class QAEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question: string;

  @Column()
  @Exclude()
  correctAnswer: number;

  @Transform(options =>
    options.map(
      (o: any) =>
        String.fromCharCode.apply(null, new Uint16Array(o)) ||
        String.fromCharCode.apply(null, new Uint16Array(o.data)),
    ),
  )
  @Column('bytea', { array: true })
  options: string[];

  @Exclude()
  @ManyToOne(
    type => UserEntity,
    user => user.createdQuestions,
  )
  createdBy: UserEntity;
}

export default QAEntity;
