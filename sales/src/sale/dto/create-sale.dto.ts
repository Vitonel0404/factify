import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDateString, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator";
import { CreatePaymentSaleDto } from "src/payment_sale/dto/create-payment_sale.dto";
import { CreateSaleDetailDto } from "src/sale_detail/dto/create-sale_detail.dto";

export class CreateSaleDto {
  @IsInt()
  id_branch: number;

  @IsInt()
  id_voucher_type: number;

  @IsInt()
  id_customer: number;

  @IsOptional()
  @IsDateString()
  date?: Date;

  @IsOptional()
  @IsString()
  series: string;

  @IsOptional()
  @IsInt()
  number: number;

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

  @IsOptional()
  @IsBoolean()
  is_credit?: boolean;

  @IsOptional()
  @IsDateString()
  due_date?: Date;

  @IsString()
  user_name: string;

  @IsOptional()
  @IsInt()
  id_quotation?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSaleDetailDto)
  detail: CreateSaleDetailDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePaymentSaleDto)
  payment: CreatePaymentSaleDto[];
}
