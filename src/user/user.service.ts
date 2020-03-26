import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findOneByConditions(conditions: object): Promise<User> {
    return this.userRepository.findOne(conditions);
  }

  findById(id: number): Promise<User> {
    return this.userRepository.findOneOrFail(id);
  }

  findAll(): Promise<[User[], number]> {
    return this.userRepository.findAndCount({
      select: ['id', 'email', 'mobile', 'status']
    });
  }

  create(data): Promise<any> {
    const user = new User();
    user.email = data.email;
    user.mobile = data.mobile;
    user.password = data.password;
    user.salt = data.salt;
    user.status = data.status;
    user.username = data.username;

    return this.userRepository.save(user);
  }
}
