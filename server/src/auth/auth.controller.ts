import { Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';

import {GoogleLoginGaurd} from './googleStrategy/google.login.gaurd';

@Controller('auth')
export class AuthController {
    constructor(){}

    @Get('google')
    @UseGuards(GoogleLoginGaurd)
    login(@Res() res){
        return res.status(HttpStatus.OK).send();
    }

    @Get('test')
    test(@Req() req){
        console.log(req.user);
        return "Hello Arun";
    }

    @Get('google/redirect')
    @UseGuards(GoogleLoginGaurd)
    redirect(@Res() res){
        console.log('logged in....');

        return res.status(HttpStatus.OK).send();
    }


}
