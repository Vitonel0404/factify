import {
  IsInt,
  IsString,
  IsOptional,
  IsBoolean,
  IsEmail,
} from 'class-validator';


export class CreateCustomerDto {
  @IsInt()
  id_document_type: number;

  @IsString()
  document_number: string;

  @IsString()
  full_name: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsBoolean()
  is_eliminated?: boolean;
}