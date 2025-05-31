import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdateAdminUserDto } from './dto/update-admin_user.dto';
import * as bcrypt from 'bcrypt';
import { CreateAdminUserDto } from './dto/create-admin_user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminUser } from './entities/admin-user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminUserService {
  constructor(@InjectRepository(AdminUser) private readonly adminUserRepository: Repository<AdminUser>) { }


  async create(createAdminUser: CreateAdminUserDto) {
    try {
      createAdminUser.password = await this.hashPassword(createAdminUser.password);
      const new_user = this.adminUserRepository.create(createAdminUser);
      return this.adminUserRepository.save(new_user);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }
}
