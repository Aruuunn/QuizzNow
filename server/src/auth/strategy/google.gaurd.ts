import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class GoogleGaurd extends AuthGuard('google') {
  async canActivate(context:ExecutionContext): Promise<boolean> {
    const can = await super.canActivate(context);
    if (can) {
      const request = context.switchToHttp().getRequest();
      super.logIn(request);
    }

    return true;
  }
}


export default GoogleGaurd;