import { Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

import {GoogleGaurd} from './strategy/google.gaurd';

@Controller('auth')
export class AuthController {
    constructor(){}

    @Get('google')
    @UseGuards(GoogleGaurd)
    login(@Res() res){
        return res.status(HttpStatus.OK).send();
    }


    @Get('google/redirect')
    @UseGuards(GoogleGaurd)
    redirect(@Res() res){
        console.log('logged in....');

        return res.status(HttpStatus.OK).send();
    }


}
