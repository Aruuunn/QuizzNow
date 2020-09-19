import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { doesNotMatch } from 'assert';
import UserEntity from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';



@Injectable()
export class GoogleSerializer extends PassportSerializer{
    constructor(private readonly userService:UserService){
        super();
    }

    serializeUser = (user:UserEntity,done:CallableFunction) => {
        done(null,user.email);
    }
    deserializeUser = (email:string,done:CallableFunction) => {
return this.userService.findByEmail(email);
    }
}