import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { AdminUser } from './entities/admin-user.entity';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(AdminUser) private readonly userRepository : Repository<AdminUser>,
    private readonly jwtService:JwtService
  ){}

  async loginAdmin(createAuthDto: CreateAuthDto) {
    const {user_name, password} = createAuthDto

    const user = await this.userRepository.findOne({where:{user_name}});
    
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
