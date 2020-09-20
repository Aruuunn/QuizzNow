import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import GoogleLoginGaurd from './googleStrategy/google.login.gaurd';
import { GoogleSerializer } from './googleStrategy/google.serializer';
import { GoogleStrategy } from './googleStrategy/google.strategy';

@Module({
    imports:[PassportModule.register({
        defaultStrategy:'google'
    }),UserModule]
    ,
    providers:[GoogleStrategy,UserService,GoogleSerializer,GoogleLoginGaurd],
    exports:[GoogleStrategy,GoogleSerializer,GoogleLoginGaurd]
})
export class AuthModule {}
