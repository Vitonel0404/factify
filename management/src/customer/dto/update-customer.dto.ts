import { IsBoolean, IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateCustomerDto {
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
}
