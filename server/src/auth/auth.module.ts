import { Module } from '@nestjs/common';
import { PassportModule, PassportSerializer } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { GoogleSerializer } from './strategy/google.serializer';
import { GoogleStrategy } from './strategy/google.strategy';

@Module({
    imports:[PassportModule.register({
        defaultStrategy:'google'
    }),UserModule]
    ,
    providers:[GoogleStrategy,UserService,GoogleSerializer]
})
export class AuthModule {}
