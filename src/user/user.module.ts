import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenModule } from '../common/services/token.module';
import { EncryptionModule } from '../common/services/encryption.module';
import { RoleService } from '../role/role.service';
import { Role } from '../role/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role]), TokenModule, EncryptionModule],
  providers: [UserService, RoleService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
