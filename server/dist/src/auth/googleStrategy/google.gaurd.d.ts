import { ExecutionContext } from '@nestjs/common';
declare const GoogleGaurd_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class GoogleGaurd extends GoogleGaurd_base {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export default GoogleGaurd;
