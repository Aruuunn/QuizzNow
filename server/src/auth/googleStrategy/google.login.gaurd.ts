import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleLoginGaurd extends AuthGuard('google') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const can = (await super.canActivate(context)) as boolean;
    if (can) {
      console.log('[Auth Gaurd]');
      const request = context.switchToHttp().getRequest();
      await super.logIn(request);
    }

    return can;
  }
}

export default GoogleLoginGaurd;
