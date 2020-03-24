import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any): Promise<any> {
    return this.authService.findOneUser(payload.username)
    .then((user) => {
      if (!user) {
        throw new Error('Cannot find user!');
      }
      return { userId: payload.sub, username: payload.username };
    })
    .catch((error) => {
      throw new UnauthorizedException(error.message);
    });
  }
}
