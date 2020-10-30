import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import UserEntity from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  authenticateUser = async (id_token: string) => {
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token.trim()}`,
      );

      if (!data.email || !data.name) {
        throw new BadRequestException();
      }

      const user = await this.userService.findByEmail(data.email);

      if (user) {
        const payload: JwtPayload = { email: user.email };
        delete user.createdQuestions;
        delete user.quizzes;
        delete user.attendedQuizzes;
        return { user, accessToken: this.jwtService.sign(payload) };
      } else {
        const newUser = new UserEntity();
        newUser.email = data.email;
        newUser.name = data.name;
        newUser.photoURL = data.picture || '';
        newUser.save();
        const payload: JwtPayload = { email: newUser.email };

        return { user: newUser, accessToken: this.jwtService.sign(payload) };
      }
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    }
  };
}
