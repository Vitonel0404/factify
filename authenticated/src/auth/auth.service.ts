import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { AdminUser } from './entities/admin-user.entity';
import { User } from './entities/user.entity';
import { jwtConstants } from './constants/jwt.constant';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(AdminUser) private readonly adminUserRepository: Repository<AdminUser>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }

  async login(createAuthDto: CreateAuthDto) {
    try {
      const { user_name, password } = createAuthDto
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
          'company.igv AS igv_value',
        ])
        .where('user.user_name = :user_name', { user_name })
        .getRawOne();

      if (!user) throw new BadRequestException('Usuario no encontrado');

      const is_valid_password = await bcrypt.compare(password, user.password);
      if (!is_valid_password) throw new BadRequestException('Credenciales inválidas');

      const payload = {
        id_user: user.id_user,
        id_branch: user.id_branch,
        name: user.name,
        last_name: user.last_name,
        user_name: user.user_name,
        email: user.email,
        tenant: user.db_name
      }

      const _user = {
        id_user: user.id_user,
        id_branch: user.id_branch,
        name: user.name,
        last_name: user.last_name,
        user_name: user.user_name,
        email: user.email,
        igv_value: user.igv_value
      }

      const token = await this.jwtService.signAsync(payload);

      const company = await this.getCompanyData(user_name)

      return { token, user: _user, company };
    } catch (error) {
      console.log(error);

    }
  }

  async getCompanyData(user_name: string) {
    try {
      const data = await this.userRepository
        .createQueryBuilder('user')
        .innerJoin('branch', 'branch', 'branch.id_branch = user.id_branch')
        .innerJoin('company', 'company', 'company.id_company = branch.id_company')
        .addSelect([
          'company.ruc AS ruc',
          'company.legal_name AS legal_name',
          'company.logo AS logo',
          'company.igv AS igv',
          'branch.trade_name AS trade_name',
          'branch.address AS address',
          'branch.geo_code AS geo_code',
          'branch.department AS department',
          'branch.province AS province',
          'branch.district AS district',
          'branch.urbanization AS urbanization',
          'branch.annex_code AS annex_code',
          'branch.phone AS phone',
          'branch.email AS email',
          'branch.is_main AS is_main'
        ])
        .where('user.user_name = :user_name', { user_name })
        .getRawOne();

      const company = {
        ruc: data.ruc,
        legal_name: data.legal_name,
        logo: data.logo,
        igv: data.igv,
        trade_name: data.trade_name,
        address: data.address,
        geo_code: data.geo_code,
        department: data.department,
        province: data.province,
        district: data.district,
        urbanization: data.urbanization,
        annex_code: data.annex_code,
        phone: data.phone,
        email: data.email,
        is_main: data.is_main
      }

      return company;

    } catch (error) {
      console.log(error);
    }
  }

  async loginAdmin(createAuthDto: CreateAuthDto) {
    const { user_name, password } = createAuthDto

    const user = await this.adminUserRepository.findOne({ where: { user_name } });

    if (!user) throw new BadRequestException('Usuario no encontrado');

    const is_valid_password = await bcrypt.compare(password, user.password);
    if (!is_valid_password) throw new BadRequestException('Credenciales inválidas');

    const payload = {
      id_admin_user: user.id_admin_user,
      name: user.name,
      last_name: user.last_name,
      user_name: user.user_name,
      email: user.email
    }

    const token = await this.jwtService.signAsync(payload);

    return { token, ...payload };
  }

  async verifyUser(token: string) {
    try {
      const secret = jwtConstants.secret;
      const payload = await this.jwtService.verifyAsync(this.getToken(token), { secret });
      const userExists = await this.userRepository.findOne({ where: { user_name: payload.user_name } });
      if (!userExists) throw new UnauthorizedException('Usuario no registrado');
      return this.getToken(token);
    } catch (error) {
      if (error?.response?.status === 401) {
        throw new UnauthorizedException('Token no válido o expirado.');
      }
      throw new UnauthorizedException('No se pudo verificar el usuario.');
    }
  }

  async verifyUserAdmin(token: string) {
    try {
      const secret = jwtConstants.secret;
      const payload = await this.jwtService.verifyAsync(this.getToken(token), { secret });
      const userExists = await this.adminUserRepository.findOne({ where: { user_name: payload.user_name } });
      if (!userExists) throw new UnauthorizedException('Usuario no registrado');
      return this.getToken(token);
    } catch (error) {
      if (error?.response?.status === 401) {
        throw new UnauthorizedException('Token no válido o expirado.');
      }
      throw new UnauthorizedException('No se pudo verificar el usuario.');
    }
  }

  private getToken(token: string) {
    const _token = token.split(' ')[1];
    return _token;
  }


}
