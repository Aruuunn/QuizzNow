import { Repository } from 'typeorm';
import UserEntity from './user.entity';
export declare class UserService {
    private userEntityRepository;
    constructor(userEntityRepository: Repository<UserEntity>);
    findByEmail: (userEmail: string, relations?: string[]) => Promise<UserEntity>;
}
