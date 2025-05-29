import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAdminUserDto } from '../admin_user/dto/create-admin_user.dto';

@Injectable()
export class UserService {
  


}
