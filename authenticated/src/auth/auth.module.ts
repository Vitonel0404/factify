import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from './entities/admin-user.entity';
import { User } from './entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([AdminUser, User])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
