import { Exclude } from "class-transformer";
import QAEntity from "src/qa/qa.entity";
import UserEntity from "src/user/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { QuizAttemptEntity } from "./quiz_attempts.entity";


@Entity()
export class QuizEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    startDatetime: Date;
    
    @Column()
    title: string;

    @Column()
    endDatetime:Date;

    @ManyToMany(type => QAEntity,{eager:true})
    @JoinTable()
    questions:QAEntity[]

    @ManyToOne(type => UserEntity,user=> user.quizzes,{eager:true})
    author: UserEntity;
    
    @OneToMany(type => QuizAttemptEntity,quizAttempt => quizAttempt.quiz)
    attempts:QuizAttemptEntity[]
    
    @Exclude()
    @CreateDateColumn()
    createdAt: Date;

    @Exclude()
    @UpdateDateColumn()
    updatedAt: Date;
}