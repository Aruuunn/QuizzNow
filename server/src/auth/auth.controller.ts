import { Controller, Get, HttpStatus, Res, UseGuards } from '@nestjs/common';

import {GoogleGaurd} from './googleStrategy/google.gaurd';

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
