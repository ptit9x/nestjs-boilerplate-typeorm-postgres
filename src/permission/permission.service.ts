import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, UpdateResult } from 'typeorm';
import { Permission } from './permission.entity';
import { PermissionRequest } from './dto/requests';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  findAll(): Promise<Permission[]> {
    const conditions = {};
    return this.permissionRepository.find(conditions);
  }

  findById(id: number): Promise<Permission> {
    return this.permissionRepository.findOneOrFail(id);
  }

  create(data: PermissionRequest): Promise<InsertResult> {
    const permission = new Permission();
    permission.name = data.name;
    permission.description = data.description;

    return this.permissionRepository.insert(permission);
  }

  update(id: number, data: PermissionRequest): Promise<UpdateResult> {
    const permission = new Permission();
    permission.name = data.name;
    permission.description = data.description;
    return this.permissionRepository.update(id, permission);
  }

  delete(permission: Permission): Promise<Permission> {
    return this.permissionRepository.remove(permission);
  }
}
