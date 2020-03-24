import { Controller, Get, Param, InternalServerErrorException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
// import { AuthGuard } from '@nestjs/passport';

// @UseGuards(AuthGuard('jwt'))
@Controller('users')
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
    })
    .catch((error) => {
      throw new InternalServerErrorException(error.message);
    });
  }

  @Get(':id')
  get(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id)
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });
  }

}
