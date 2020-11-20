import QAEntity from "src/qa/qa.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { QuizAttemptEntity } from "./quiz_attempts.entity";


@Entity()
export class QuestionAttemptEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @ManyToMany(type => QAEntity)
  @JoinTable()
  question: QAEntity;

  @ManyToOne(type => QuizAttemptEntity,quizAttempt => quizAttempt.questionAttempts)
  attempt: QuizAttemptEntity;

  @Column()
  optionChoosed: number;
}