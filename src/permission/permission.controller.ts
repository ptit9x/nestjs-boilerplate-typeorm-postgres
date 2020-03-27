import { Controller, Get, Post, Body, Param, Put, UseGuards, UseInterceptors, HttpCode, Delete, NotAcceptableException, InternalServerErrorException } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Permission } from './permission.entity';
import { InsertResult } from 'typeorm';
import { AuthGuard } from '../common/guards/auth.guard';
import { PermissionRequest } from './dto/requests';
import { ExceptionInterceptor } from '../common/interceptors/exception.interceptor';

@Controller('permissions')
@UseGuards(AuthGuard)
@UseInterceptors(ExceptionInterceptor)
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) { }

  @Get()
  findAll(): Promise<Permission[]> {
    return this.permissionService.findAll();
  }

  @Get(':id')
  get(@Param('id') id: number): Promise<Permission> {
    return this.permissionService.findById(id);
  }

  @Post()
  async create(@Body() body: PermissionRequest): Promise<InsertResult> {
    const created = await this.permissionService.create(body);
    return created && created.raw && created.raw[0] ? created.raw[0] : created;
  }

  @Put(':id')
  @HttpCode(204)
  async update(@Param('id') id: number, @Body() body: PermissionRequest): Promise<boolean> {
    const updated = await this.permissionService.update(id, body);
    if (updated.affected < 1) {
      throw new InternalServerErrorException(`cannot update with id ${id}!`);
    }
    return true;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Permission> {
    const permission = await this.permissionService.findById(id);
    return this.permissionService.delete(permission);
  }
}
