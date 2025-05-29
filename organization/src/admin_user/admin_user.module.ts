import { Module } from '@nestjs/common';
import { AdminUserService } from './admin_user.service';
import { AdminUserController } from './admin_user.controller';
import { AdminUser } from './entities/admin-user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([AdminUser])],
  controllers: [AdminUserController],
  providers: [AdminUserService],
})
export class AdminUserModule {}
