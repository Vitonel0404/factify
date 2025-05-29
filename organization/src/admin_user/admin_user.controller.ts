import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminUserService } from './admin_user.service';
import { UpdateAdminUserDto } from './dto/update-admin_user.dto';
import { CreateAdminUserDto } from './dto/create-admin_user.dto';

@Controller('admin-user')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @Post()
  create(@Body() createAdminUserDto: CreateAdminUserDto) {
    return this.adminUserService.create(createAdminUserDto);
  }

}
