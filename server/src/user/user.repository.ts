import { EntityRepository, Repository } from "typeorm";
import UserEntity from "./user.entity";


@EntityRepository(UserEntity)
class UserRepository extends Repository<UserEntity> {
}


export default UserRepository;