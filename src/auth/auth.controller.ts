import { Controller, Post, UseGuards, Request, UseInterceptors, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ExceptionInterceptor } from '../common/interceptors/exception.interceptor';
import { RegisterDto } from './dto/register.dto';

@Controller()
@UseInterceptors(ExceptionInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }
}
