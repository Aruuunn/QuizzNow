import { Column, PrimaryGeneratedColumn } from "typeorm";

export class QuizAttemptEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column("uuid")
  qid:string

  @Column("bytea")
  answeredQuestions:{id:string,option:number}[]
 
  @Column({default:0})
  totalScore:number
}