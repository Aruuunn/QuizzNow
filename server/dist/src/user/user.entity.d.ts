import { BaseEntity } from "typeorm";
declare class UserEntity extends BaseEntity {
    id: string;
    name: string;
    email: string;
    photoURL: string;
}
export default UserEntity;
