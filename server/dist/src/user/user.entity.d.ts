import { BaseEntity } from "typeorm";
declare class UserEntity extends BaseEntity {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}
export default UserEntity;
