import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";

export class UpdateCorrelativeDto {
    @IsInt()
    id_voucher_type: number;

    @IsString()
    series: string;

    @IsInt()
    last_number: number;

    @IsInt()
    maximun_correlative: number;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}
