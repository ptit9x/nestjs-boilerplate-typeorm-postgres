import { Controller, Get, Post, Body, Param, InternalServerErrorException, Put, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { InsertResult, UpdateResult } from 'typeorm';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Get()
  findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  get(@Param('id') id: number): Promise<Role> {
    return this.roleService.findOne(id)
    .catch((error) => {
      throw new InternalServerErrorException(error.message);
    });
  }

  @Post()
  create(@Body() body: Role): Promise<InsertResult> {
    return this.roleService.create(body)
    .then(res => res.raw)
    .catch((error) => {
      throw new InternalServerErrorException(error.message);
    });
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: Role): Promise<UpdateResult> {
    return this.roleService.update(id, body)
    .then(res => res.raw)
    .catch((error) => {
      throw new InternalServerErrorException(error.message);
    });
  }
}
