import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async findOneUser(username: string): Promise<any> {
    return this.usersService.findOneByConditions({ username });
  }

  register(user) {
    const salt = bcrypt.genSaltSync(10);
    const encryptPassword = bcrypt.hashSync(user.password, salt);
    const data = Object.assign({ salt }, user);
    data.password = encryptPassword;

    return this.usersService.create(data);
  }

  login(user: any) {
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
    };
  }
}
