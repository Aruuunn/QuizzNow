import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
declare const GoogleStrategy_base: new (...args: any[]) => Strategy;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validate: (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => Promise<any>;
}
export {};
