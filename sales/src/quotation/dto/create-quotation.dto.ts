import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsInt, IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator";
import { CreateQuotationDetailDto } from "src/quotation_detail/dto/create-quotation_detail.dto";

export class CreateQuotationDto {
  @IsInt()
  id_branch: number;

  @IsInt()
  id_customer: number;

  @IsOptional()
  @IsInt()
  quotation_number: number;

  @IsDate()
  @IsOptional()
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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuotationDetailDto)
  detail: CreateQuotationDetailDto[];
}