import QAEntity from "src/qa/qa.entity";
import { QuizEntity } from "src/quiz/quiz.entity";
import { Entity,BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
class UserEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string;

    @Column({unique:true})
    email:string

    @Column({nullable:true})
    photoURL:string;

    @OneToMany(type => QuizEntity,quiz => quiz.author)
    quizzes:QuizEntity[];

    @OneToMany(type => QuizEntity,quiz => quiz.participants)
    attendedQuizzes:QuizEntity[]

    @OneToMany(type => QAEntity,qa => qa.author)
    createdQuestions:QAEntity[]
}


export default UserEntity;