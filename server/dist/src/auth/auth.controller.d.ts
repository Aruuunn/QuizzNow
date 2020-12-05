import UserEntity from 'src/user/user.entity';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    auth(id_token: string): Promise<{
        user: UserEntity;
        accessToken: string;
    }>;
}
