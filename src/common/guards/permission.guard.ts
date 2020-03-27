import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { TokenService } from '../services/token.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.user, " requestrequestrequest");
    const user = request.user;

    return !!user;
  }
}