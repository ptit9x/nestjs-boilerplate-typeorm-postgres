import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';
import { User } from './user.entity';
import { UserRequest } from './dto/requests';
import { EncryptionService } from '../common/services/encryption.service';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly encryptionService: EncryptionService,
    private readonly roleService: RoleService,
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

  async create(data: UserRequest): Promise<InsertResult> {
    const salt = this.encryptionService.getSalt();
    const password = this.encryptionService.encryptPassword(data.password, salt);

    const user = new User();
    user.email = data.email;
    user.mobile = data.mobile;
    user.password = password;
    user.salt = salt;
    user.status = data.status;
    user.username = data.username;
    if (data.roleId) {
      user.role = await this.roleService.findById(data.roleId);
    }
    return this.userRepository.insert(user);
  }
}
