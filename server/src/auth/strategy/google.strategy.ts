import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import * as passport from 'passport';

import UserEntity from 'src/user/user.entity';
import baseURL from 'config/domain';
import { UserService } from 'src/user/user.service';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private userService: UserService) {
    super({
      clientID: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET,
      callbackURL: `${baseURL}/auth/google/redirect`,
      scope: ['email', 'profile'],
    });
  }

  validate = async (
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> => {
    const { name, emails } = profile;

    if (!emails || !emails[0]) {
      done('Email should not be empty');
      return;
    }

    const user = await this.userService.findByEmail(emails[0].value);

    if (!user) {
      const newUser = new UserEntity();
      newUser.email = emails[0].value;
      newUser.name = name.givenName + ' ' + name.familyName;
      newUser.save();
      console.log(newUser);
      done(null, newUser);
      return;
    }

    done(null, user);
  };

}
