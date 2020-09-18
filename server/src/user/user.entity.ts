import { Entity,BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";



@Entity()
class UserEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    firstName:string;

    @Column()
    lastName:string;

    @Column()
    email:string
}


export default UserEntity;