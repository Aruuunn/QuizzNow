import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    auth(id_token: string): Promise<{
        user: import("../user/user.entity").default;
        accessToken: string;
    }>;
}
