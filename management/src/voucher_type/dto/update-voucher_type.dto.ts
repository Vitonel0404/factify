import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateVoucherTypeDto {
    @IsString()
    description: string;

    @IsString()
    sunat_code: string;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}
