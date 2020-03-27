import { Controller, Get, Param, UseInterceptors, UseGuards, Request, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ExceptionInterceptor } from '../common/interceptors/exception.interceptor';
import { AuthGuard } from '../common/guards/auth.guard';
import { UserDecorator } from '../common/decorators/user-decorator';
import { UserRequest } from './dto/requests';
import { CreateUserResponse } from './dto/responses';

@Controller('users')
@UseGuards(AuthGuard)
@UseInterceptors(ExceptionInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  findAll(): Promise<any> {
    return this.userService.findAll();
  }

  @Get('profile')
  get(@UserDecorator() user): Promise<User> {
    return this.userService.findById(user.id);
  }

  @Post('create')
  async create(@Body() body: UserRequest): Promise<CreateUserResponse> {
    const created = await this.userService.create(body);
    return created && created.raw && created.raw[0] ? created.raw[0] : created;
  }
}
