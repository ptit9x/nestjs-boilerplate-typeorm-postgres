import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, UpdateResult } from 'typeorm';
import { Role } from './role.entity';
import { RoleRequest } from './dto/requests';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  findById(id: number): Promise<Role> {
    return this.roleRepository.findOneOrFail(id);
  }

  create(data: RoleRequest): Promise<InsertResult> {
    const role = new Role();
    role.name = data.name;
    role.description = data.description;

    return this.roleRepository.insert(role);
  }

  update(id: number, data: RoleRequest): Promise<UpdateResult> {
    const role = new Role();
    role.name = data.name;
    role.description = data.description;
    return this.roleRepository.update(id, role);
  }

  delete(Role: Role): Promise<Role> {
    return this.roleRepository.remove(Role);
  }
}
