import { ExecutionContext } from '@nestjs/common';
declare const GoogleLoginGaurd_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class GoogleLoginGaurd extends GoogleLoginGaurd_base {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export default GoogleLoginGaurd;
