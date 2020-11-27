import { BadRequestException, Injectable } from '@nestjs/common';
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

  createUserEntity = async (
    email: string,
    name: string,
    photoURL: string,
  ) => {
    const newUser = new UserEntity();
    newUser.userEmail = email;
    newUser.userName = name;
    newUser.userPhotoURL = photoURL || '';
    await newUser.save();
    return newUser;
  };
  verifyJwt = (token: string) => {
    return this.jwtService.verify(token, {
      ignoreExpiration: false,
      secret: JWT_SECRET,
    });
  };

  getUserAndAccessToken = (user: UserEntity) => {
    const payload: JwtPayload = { email: user.userEmail };
    return { user, accessToken: this.jwtService.sign(payload) };
  };

   fetchData = async (id_token:string) => {
    return  (await axios.get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token.trim()}`,
      )).data;
  }

  authenticateUser = async (id_token: string) => {
    try {
      const  data  = await this.fetchData(id_token);

      if (!data || !data.email || !data.name) {
        throw new BadRequestException();
      }

      const user = await this.userService.findByEmail(data.email);

      if (user) {
        return this.getUserAndAccessToken(user);
      } else {
        const newUser = await this.createUserEntity(
          data.email,
          data.name,
          data.picture,
        );

        return this.getUserAndAccessToken(newUser);
      }
    } catch (e) {
      throw new BadRequestException();
    }
  };
}
