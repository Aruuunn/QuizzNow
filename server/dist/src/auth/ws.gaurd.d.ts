import { CanActivate } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
export declare class WsGuard implements CanActivate {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    canActivate(context: any): Promise<boolean | any>;
}
