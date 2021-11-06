import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { UserCreateDto } from './dto/user-create.dto';
import { JwtAuthGuard } from './strategy/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: UserLoginDto) {
    return this.authService.login(dto);
  }

  @Post('register')
  async register(@Body() dto: UserCreateDto) {
    return this.authService.create(dto);
  }
}
