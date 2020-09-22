import QAEntity from "src/qa/qa.entity";
import UserEntity from "src/user/user.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class QuizEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    startDatetime:Date;

    @Column()
    endDatetime:Date;

    @ManyToMany(type => QAEntity,{eager:true})
    @JoinTable()
    questions:QAEntity[]

    @ManyToOne(type => UserEntity,user=> user.quizzes,{eager:true})
    author:UserEntity;

    @ManyToOne(type => UserEntity,user=> user.attendedQuizzes,{eager:true,})
    participants:UserEntity[];
}