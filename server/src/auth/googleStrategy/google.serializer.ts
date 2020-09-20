import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import UserEntity from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoogleSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser = (user: UserEntity, done: CallableFunction) => {
    console.log('serializing....');
    done(null, user.email);
  };
  deserializeUser = (email: string, done: CallableFunction) => {
    console.log('Deserializing....');

    this.userService
      .findByEmail(email)
      .then(user => done(null, user))
      .catch(err => done(err));
  };
}
