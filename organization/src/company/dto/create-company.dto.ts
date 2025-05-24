import {
  IsString,
  IsOptional,
  IsEmail,
} from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  ruc: string;

  @IsString()
  legal_name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsString()
  second_user_sunat?: string;

  @IsOptional()
  @IsString()
  second_password_sunat?: string;
}