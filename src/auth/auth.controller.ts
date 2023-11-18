import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/user.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() user: RegisterDto) {
    return await this.authService.register(user);
  }

  @Post('login')
  login(@Body() user: LoginDto) {
    return this.authService.login(user);
  }
}
