import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdatePaymentMethodDto {
    @IsString()
    description: string;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}
