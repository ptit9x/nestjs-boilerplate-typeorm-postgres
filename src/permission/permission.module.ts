import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { Permission } from './permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenModule } from '../common/services/token.module';

@Module({
  imports: [TypeOrmModule.forFeature([Permission]), TokenModule],
  providers: [PermissionService],
  controllers: [PermissionController],
})
export class PermissionModule {}
