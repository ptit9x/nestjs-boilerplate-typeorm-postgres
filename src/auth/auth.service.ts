import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { EncryptionService } from '../common/services/encryption.service';
import { TokenService } from '../common/services/token.service';
import { TokenResponse } from './dto/responses';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly encryptionService: EncryptionService,
    private readonly tokenService: TokenService,
  ) { }

  async register(userData): Promise<TokenResponse> {
    const salt = this.encryptionService.getSalt();
    const password = this.encryptionService.encryptPassword(userData.password, salt);
  
    const newUser = Object.assign({}, userData);
    newUser.salt = salt;
    newUser.password = password;

    const user = await this.usersService.create(newUser);
    const accessToken = await this.tokenService.generateToken(user);
    const refreshToken = await this.tokenService.generateRefreshToken(user);

    return {
      accessToken,
      refreshToken,
    }
  }

  async login({ username, password }): Promise<TokenResponse> {
    const user = await this.usersService.findOneByConditions({ username, status: 1 });
    if (!user) {
      throw new NotFoundException('Invalid username!');
    }

    const isValid = this.encryptionService.isValidPassword(password, user.salt, user.password);
    if (!isValid) {
      throw new BadRequestException('The password is incorrect!');
    }

    const accessToken = await this.tokenService.generateToken(user);
    const refreshToken = await this.tokenService.generateRefreshToken(user);

    return {
      accessToken,
      refreshToken,
    }
  }

  async refreshToken(refreshToken: string): Promise<TokenResponse> {
    const decoded: any = await this.tokenService.verifyRefreshToken(refreshToken);
    const id = decoded.id;
    const user = await this.usersService.findById(id);

    const accessToken = await this.tokenService.generateToken(user);
    const refresh = await this.tokenService.generateRefreshToken(user);
    return {
      accessToken,
      refreshToken: refresh,
    }
  }
}
