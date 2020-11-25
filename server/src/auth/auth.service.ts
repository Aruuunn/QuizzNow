import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import UserEntity from '../user/user.entity';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt.payload';
import { JWT_SECRET } from '../../config/env';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  verifyJwt =  (token: string) => {
    return this.jwtService.verify(token, {
      ignoreExpiration: false,
      secret: JWT_SECRET,
    });
  };

  authenticateUser = async (id_token: string) => {
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token.trim()}`,
      );

      if (!data || !data.email || !data.name) {
        throw new BadRequestException();
      }

      const user = await this.userService.findByEmail(data.email);

      if (user) {
        const payload: JwtPayload = { email: user.userEmail };
        return { user, accessToken: this.jwtService.sign(payload) };
      } else {
        const newUser = new UserEntity();
        newUser.userEmail = data.email;
        newUser.userName = data.name;
        newUser.userPhotoURL = data.picture || '';
        newUser.save();
        const payload: JwtPayload = { email: newUser.userEmail };

        return { user: newUser, accessToken: this.jwtService.sign(payload) };
      }
    } catch (e) {
      throw new BadRequestException();
    }
  };
}
