import { Controller, Get, Param, InternalServerErrorException, UseInterceptors, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ExceptionInterceptor } from '../common/interceptors/exception.interceptor';
import { AuthGuard } from '../common/guards/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
@UseInterceptors(ExceptionInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  findAll(): Promise<{ data: User[], total: number }> {
    return this.userService.findAll()
    .then((res) => {
      if (!res) {
        throw new Error('error');
      }
      const [data, total] = res;
      return {
        data,
        total,
      };
    });
  }

  @Get(':id')
  get(@Param('id') id: number): Promise<User> {
    return this.userService.findById(id)
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });
  }
}
