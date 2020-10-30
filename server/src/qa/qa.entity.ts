import UserEntity from "src/user/user.entity";
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(type => UserEntity,user => user.createdQuestions)
    author:UserEntity;
}

export default QAEntity;