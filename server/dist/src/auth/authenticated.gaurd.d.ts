import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class AuthenticatedGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean>;
}
