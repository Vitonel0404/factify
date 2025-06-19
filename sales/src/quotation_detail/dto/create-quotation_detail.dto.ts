import { IsInt, IsNumber, IsOptional, IsPositive } from "class-validator";

export class CreateQuotationDetailDto {
  @IsOptional()
  @IsInt()
  id_quotation: number;

  @IsInt()
  id_product: number;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsNumber()
  @IsPositive()
  subtotal: number;
}