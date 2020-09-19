import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

}

export default QAEntity;