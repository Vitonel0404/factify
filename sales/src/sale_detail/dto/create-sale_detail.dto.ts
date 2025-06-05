import { IsInt, IsNumber, IsOptional, IsPositive } from "class-validator";

export class CreateSaleDetailDto {
  @IsOptional()
  @IsInt()
  id_sale: number;

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