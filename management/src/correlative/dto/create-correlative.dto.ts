import { IsInt, IsString } from "class-validator";

export class CreateCorrelativeDto {
    @IsInt()
    id_branch: number;

    @IsInt()
    id_voucher_type: number;

    @IsString()
    series: string;

    @IsInt()
    last_number: number;

    @IsInt()
    maximun_correlative: number;
}
