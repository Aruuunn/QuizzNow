import { PassportSerializer } from '@nestjs/passport';
import UserEntity from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
export declare class GoogleSerializer extends PassportSerializer {
    private readonly userService;
    constructor(userService: UserService);
    serializeUser: (user: UserEntity, done: CallableFunction) => void;
    deserializeUser: (email: string, done: CallableFunction) => Promise<UserEntity>;
}
