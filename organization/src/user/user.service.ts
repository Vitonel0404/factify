import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    async create(createUserDto: CreateUserDto) {
        const exists = await this.validateUserExists(createUserDto.user_name)
        if (exists) throw new ConflictException('El nombre de usuario ya existe. Intente con otro.');
        createUserDto.password = await this.hashPassword(createUserDto.password);
        const new_user = this.userRepository.create(createUserDto);
        return this.userRepository.save(new_user);
    }

    async validateUserExists(user_name : string){
        const user = await this.userRepository.findOne({ where: { user_name } });
        return !!user
    }

    hashPassword(password: string): Promise<string> {
        const saltOrRounds = 10;
        return bcrypt.hash(password, saltOrRounds);
    }

}
