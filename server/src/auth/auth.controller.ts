import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('google')
  async auth(@Body('id_token') id_token: string) {
  return await this.authService.authenticateUser(id_token);
  }
}
