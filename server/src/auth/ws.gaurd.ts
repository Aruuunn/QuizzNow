import { Injectable, CanActivate } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  canActivate(context: any): boolean | any | Promise<boolean | any> {
    const bearerToken = context.args[0]?.handshake?.query?.token

    if (!bearerToken) {
      return false;
    }

    try {
      const decoded = this.authService.verifyJwt(bearerToken) as any;
      return new Promise((resolve, reject) => {
         this.userService.findByEmail(decoded.email).then(user => {
          if (user) {
            resolve(user);
          } else {
            reject(false);
          }
        });
      });
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }
}
