import { JwtService } from '@nestjs/jwt';
import UserEntity from '../user/user.entity';
import { UserService } from '../user/user.service';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    verifyJwt: (token: string) => any;
    authenticateUser: (id_token: string) => Promise<{
        user: UserEntity;
        accessToken: string;
    }>;
}
