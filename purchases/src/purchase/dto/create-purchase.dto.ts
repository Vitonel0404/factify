import { Type } from "class-transformer";
import { IsArray, IsDateString, IsInt, IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator";
import { CreatePurchaseDetailDto } from "src/purchase_detail/dto/create-purchase_detail.dto";

export class CreatePurchaseDto {
    @IsInt()
    id_branch: number;

    @IsInt()
    id_supplier: number;

    @IsInt()
    id_voucher_type: number;

    @IsString()
    series: string;

    @IsInt()
    @IsPositive()
    number: number;

    @IsOptional()
    @IsDateString()
    date?: Date;

    @IsNumber()
    @IsPositive()
    total: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    taxed_operation: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    igv_percent: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    igv: number;

    @IsString()
    user_name: string;

    @IsOptional()
    @IsInt()
    id_purchase_order?: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePurchaseDetailDto)
    detail: CreatePurchaseDetailDto[];
}
