import { Controller, Post, UseInterceptors, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ExceptionInterceptor } from '../common/interceptors/exception.interceptor';
import { RegisterRequest, LoginRequest, RefreshTokenRequest } from './dto/requests';
import { TokenResponse } from './dto/responses';

@Controller()
@UseInterceptors(ExceptionInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterRequest): Promise<TokenResponse> {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: LoginRequest): Promise<TokenResponse> {
    return this.authService.login(body);
  }

  @Post('refresh-token')
  refreshToken(@Body() body: RefreshTokenRequest): Promise<TokenResponse> {
    return this.authService.refreshToken(body.refreshToken);
  }
}
