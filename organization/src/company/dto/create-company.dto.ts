import {
  IsString,
  IsOptional,
  IsEmail,
  IsBoolean,
  IsInt,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @Length(11, 20)
  ruc: string;

  @IsString()
  @MaxLength(250)
  legal_name: string;

  @IsEmail()
  @MaxLength(250)
  email: string;

  @IsString()
  @MaxLength(20)
  phone: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  logo?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  second_user_sunat?: string;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  second_password_sunat?: string;

  // @IsString()
  // @MaxLength(250)
  // db_name: string;

  @IsOptional()
  @IsBoolean()
  is_delinquent?: boolean;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsInt()
  id_admin_user: number;
}
