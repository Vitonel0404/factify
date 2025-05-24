import { Controller, Post, Body} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("admin")
  registerUser(@Body() userData: CreateAdminUserDto) {
    return this.userService.createAdmin(userData);
  }

}
