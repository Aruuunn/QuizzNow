import { Body, Controller, Post } from '@nestjs/common';
import UserEntity from 'src/user/user.entity';
import { AuthService } from './auth.service';

/**
 * Auth Controller
 * base path  : /api/auth
 */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * @param id_token - expects the id_token got after google authorization
   * @returns Promise<{ user: UserEntity; accessToken: string }>
   */
  @Post('google')
  async auth(
    @Body('id_token') id_token: string,
  ): Promise<{ user: UserEntity; accessToken: string }> {
    return await this.authService.authenticateUser(id_token);
  }
}
