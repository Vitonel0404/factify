import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { AdminUser } from './entities/admin-user.entity';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';

@Injectable()
export class UserService {
  
  constructor(@InjectRepository(AdminUser) private readonly adminUserRepository : Repository<AdminUser>) {}


  async createAdmin(createAdminUser: CreateAdminUserDto) {
    console.log(createAdminUser);
    try {
      createAdminUser.password = await this.hashPassword(createAdminUser.password);
      const new_user = this.adminUserRepository.create(createAdminUser);
      return this.adminUserRepository.save(new_user);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  hashPassword(password:string): Promise<string>{
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }

}
