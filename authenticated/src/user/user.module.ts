import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AdminUser } from './entities/admin-user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([AdminUser,User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
