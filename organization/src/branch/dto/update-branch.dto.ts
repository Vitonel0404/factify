import { IsBoolean, IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateBranchDto {
    @IsString()
    @MaxLength(250)
    trade_name: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    address?: string;

    @IsOptional()
    @IsString()
    @MaxLength(10)
    geo_code?: string;

    @IsOptional()
    @IsString()
    @MaxLength(250)
    department?: string;

    @IsOptional()
    @IsString()
    @MaxLength(250)
    province?: string;

    @IsOptional()
    @IsString()
    @MaxLength(250)
    district?: string;

    @IsOptional()
    @IsString()
    @MaxLength(250)
    urbanization?: string;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    annex_code?: string;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    phone?: string;

    @IsOptional()
    @IsEmail()
    @MaxLength(250)
    email?: string;

    @IsOptional()
    @IsBoolean()
    is_main?: boolean;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}
