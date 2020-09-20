import { QuizEntity } from "src/quiz/quiz.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class QAEntity extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    question:string;

    @Column()
    correctAnswer:number;

    @Column('bytea',{array:true})
    answers:string[]

    @ManyToOne(type => QuizEntity,quiz => quiz.questions)
    quiz:QuizEntity;

}

export default QAEntity;