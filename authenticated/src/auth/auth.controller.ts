import { Controller, Post, Body, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('')
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }

  @Post('admin')
  loginAdmin(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.loginAdmin(createAuthDto);
  }

  @Get('verify')
  verifyUser(@Req() req: Request) {
    const token = req.headers.authorization;
    return this.authService.verifyUser(token || '');
  }

  @Get('verify-admin')
  verifyUserAdmin(@Req() req: Request) {
    const token = req.headers.authorization;
    return this.authService.verifyUserAdmin(token || '');
  }
}
