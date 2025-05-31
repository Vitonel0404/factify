import { IsBoolean, IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCompanyDto {
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

    @IsOptional()
    @IsBoolean()
    is_delinquent?: boolean;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}
