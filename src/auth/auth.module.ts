import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { EncryptionModule } from '../common/services/encryption.module';
import { TokenModule } from '../common/services/token.module';

@Module({
  imports: [
    UserModule,
    EncryptionModule,
    TokenModule,
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})

export class AuthModule {}
