import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { AdminUser } from './entities/admin-user.entity';
import { User } from './entities/user.entity';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(AdminUser) private readonly adminUserRepository : Repository<AdminUser>,
    @InjectRepository(User) private readonly userRepository : Repository<User>,
    private readonly jwtService:JwtService
  ){}

  async login(createAuthDto: CreateAuthDto) {
    try {
      
    
    const {user_name, password} = createAuthDto

    // const user = await this.userRepository.findOne({where:{user_name}});
    
    const user = await this.userRepository
    .createQueryBuilder('user')
    .innerJoin('branch', 'branch', 'branch.id_branch = user.id_branch')
    .innerJoin('company', 'company', 'company.id_company = branch.id_company')
    .addSelect([
      'user.id_user AS id_user',
      'user.user_name AS user_name',
      'user.password AS password',
      'user.name AS name',
      'user.last_name AS last_name',
      'user.email AS email',
      'branch.id_branch AS id_branch',
      'company.db_name AS db_name',
    ])
    .where('user.user_name = :user_name', { user_name })
    .getRawOne();

    console.log(user);
    
    if (!user) throw new BadRequestException('Usuario no encontrado');

    const is_valid_password = await bcrypt.compare(password, user.password);
    if (!is_valid_password) throw new BadRequestException('Credenciales inválidas');

    const payload = {
      id_user : user.id_user, 
      id_branch: user.id_branch,
      name: user.name, 
      last_name: user.last_name, 
      user_name : user.user_name, 
      email: user.email,
      tenant: user.db_name
    }

    const _user = {
      id_user : user.id_user, 
      id_branch: user.id_branch,
      name: user.name, 
      last_name: user.last_name, 
      user_name : user.user_name, 
      email: user.email
    }

    const token = await this.jwtService.signAsync(payload);
    
    return {token, user : _user};
    } catch (error) {
      console.log(error);
      
    }
  }

  async loginAdmin(createAuthDto: CreateAuthDto) {
    const {user_name, password} = createAuthDto

    const user = await this.adminUserRepository.findOne({where:{user_name}});
    
    if (!user) throw new BadRequestException('Usuario no encontrado');

    const is_valid_password = await bcrypt.compare(password, user.password);
    if (!is_valid_password) throw new BadRequestException('Credenciales inválidas');

    const payload = {
      id_admin_user : user.id_admin_user, 
      name: user.name, 
      last_name: user.last_name, 
      user_name : user.user_name, 
      email: user.email
    }

    const token = await this.jwtService.signAsync(payload);
    
    return {token, ...payload};
  }


}
