import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, UpdateResult } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  findOne(id: number): Promise<Role> {
    return this.roleRepository.findOneOrFail(id);
  }

  create(Role: Role): Promise<InsertResult> {
    return this.roleRepository.insert(Role);
  }

  update(id: number, Role: Role): Promise<UpdateResult> {
    return this.roleRepository.update(id, Role);
  }

  delete(Role: Role): Promise<Role> {
    return this.roleRepository.remove(Role);
  }
}
