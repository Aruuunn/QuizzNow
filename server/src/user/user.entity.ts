import { QuizEntity } from "src/quiz/quiz.entity";
import { Entity,BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";



@Entity()
class UserEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string;

    @Column()
    email:string

    @Column()
    photoURL:string;

    @OneToMany(type => QuizEntity,quiz => quiz.author)
    quizzes:QuizEntity[];

    @OneToMany(type => QuizEntity,quiz => quiz.participants)
    attendedQuizzes:QuizEntity[]
}


export default UserEntity;