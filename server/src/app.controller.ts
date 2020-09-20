import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

import {AuthenticatedGuard} from './auth/authenticated.gaurd';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  getHello(): string {
    return this.appService.getHello();
  }
}
