import { Controller, Get, Post, Body, Param, InternalServerErrorException, Put, UseGuards, HttpCode, UseInterceptors } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { InsertResult } from 'typeorm';
import { AuthGuard } from '../common/guards/auth.guard';
import { RoleRequest } from './dto/requests';
import { ExceptionInterceptor } from '../common/interceptors/exception.interceptor';

@Controller('roles')
@UseGuards(AuthGuard)
@UseInterceptors(ExceptionInterceptor)
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Get()
  findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<Role> {
    return this.roleService.findById(id);
  }

  @Post()
  async create(@Body() body: RoleRequest): Promise<InsertResult> {
    const created = await this.roleService.create(body);
    return created && created.raw && created.raw[0] ? created.raw[0] : created;
  }

  @Put(':id')
  @HttpCode(204)
  async update(@Param('id') id: number, @Body() body: RoleRequest): Promise<boolean> {
    const updated = await this.roleService.update(id, body);
    if (updated.affected < 1) {
      throw new InternalServerErrorException(`cannot update with id ${id}!`);
    }
    return true;
  }
}
