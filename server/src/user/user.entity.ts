import { Entity,BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";



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
}


export default UserEntity;