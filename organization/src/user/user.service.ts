import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private readonly adminUserRepository: Repository<User>) { }

    async create(createAdminUser: CreateUserDto) {
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
