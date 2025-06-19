import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDateString, IsInt, IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator";
import { CreatePurchaseOrderDetailDto } from "src/purchase_order_detail/dto/create-purchase_order_detail.dto";

export class CreatePurchaseOrderDto {
    @IsInt()
    id_branch: number;

    @IsInt()
    id_supplier: number;

    @IsOptional()
    @IsString()
    @IsPositive()
    order_number: number;

    @IsOptional()
    @IsOptional()
    @IsDateString()
    date: Date;

    @IsOptional()
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
    @IsBoolean()
    is_active?: boolean;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePurchaseOrderDetailDto)
    detail: CreatePurchaseOrderDetailDto[];
}