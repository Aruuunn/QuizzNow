import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JWT_SECRET } from '../../config/env';
import { JwtStrategy } from './Jwt.strategy';
import { AuthService } from './auth.service';

export const passportAuthModules = [
  PassportModule.register({
    defaultStrategy: 'jwt',
    session: false,
  }),
  JwtModule.register({
    secret: JWT_SECRET,
    signOptions: {
      expiresIn: '7d',
    },
  }),
];

@Module({
  imports: [...passportAuthModules, UserModule],
  providers: [JwtStrategy, AuthService],
  exports: [JwtStrategy, AuthService],
})
export class AuthModule {}
