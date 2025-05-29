import {
  IsString,
  IsEmail,
  MaxLength,
  MinLength,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateAdminUserDto {
  @IsString()
  @MaxLength(150)
  user_name: string;

  @IsString()
  @MaxLength(250)
  name: string;

  @IsString()
  @MaxLength(250)
  last_name: string;

  @IsEmail()
  @MaxLength(150)
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(250)
  password: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
