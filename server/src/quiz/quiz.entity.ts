import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class QuizEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    startDatetime:Date;

    @Column()
    endDatetime:Date;

}