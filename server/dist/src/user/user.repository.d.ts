import { Repository } from "typeorm";
import UserEntity from "./user.entity";
declare class UserRepository extends Repository<UserEntity> {
}
export default UserRepository;
