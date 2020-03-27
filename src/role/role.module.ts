import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenModule } from '../common/services/token.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), TokenModule],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
