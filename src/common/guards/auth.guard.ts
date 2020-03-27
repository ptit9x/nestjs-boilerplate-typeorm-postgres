import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    if (!authorization) {
      throw new BadRequestException("Authorization header is requied");
    }

    try {
      const user = await this.tokenService.verifyToken(authorization);
      request.user = user;

      return !!user;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }
}