import QAEntity from "src/qa/qa.entity";
import UserEntity from "src/user/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class QuizEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    startDatetime:Date;

    @Column()
    endDatetime:Date;

    @OneToMany(type => QAEntity,qa => qa.quiz,{eager:true})
    questions:QAEntity[]

    @ManyToOne(type => UserEntity,user=> user.quizzes,{eager:true})
    author:UserEntity;

    @ManyToOne(type => UserEntity,user=> user.attendedQuizzes,{eager:true})
    participants:UserEntity[];


}