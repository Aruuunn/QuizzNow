import { JwtService } from '@nestjs/jwt';
import UserEntity from '../user/user.entity';
import { UserService } from '../user/user.service';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    createUserEntity: (email: string, name: string, photoURL: string) => Promise<UserEntity>;
    verifyJwt: (token: string) => any;
    getUserAndAccessToken: (user: UserEntity) => {
        user: UserEntity;
        accessToken: string;
    };
    authenticateUser: (id_token: string) => Promise<{
        user: UserEntity;
        accessToken: string;
    }>;
}
