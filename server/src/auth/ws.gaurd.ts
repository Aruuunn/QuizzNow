import { Injectable, CanActivate } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
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
      if (!user) {
        throw Error('User Not Found');
      }
      context.switchToWs().getData().user = user;
      return true;
    } catch (ex) {
      context.args[0]?.server?.emit('400');
      return false;
    }
  }
}
