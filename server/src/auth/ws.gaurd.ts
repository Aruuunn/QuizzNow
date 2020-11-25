import { Injectable, CanActivate,  } from '@nestjs/common';
import { UNAUTHORIZED } from '../../common/ws.event.types';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  async canActivate(context: any): Promise<boolean | any> {
    const bearerToken = context.args[0]?.handshake?.query?.token;

    try {
      const decoded = this.authService.verifyJwt(bearerToken) as any;
      const user = await this.userService.findByEmail(decoded.email);
      let data = context.switchToWs().getData();
     if(typeof data==='object'){
        data.user = user;
      }

      return true;
    } catch (ex) {
      console.log(ex);
      context.args[0]?.server?.emit(UNAUTHORIZED);

      return false;
    }
  }
}
