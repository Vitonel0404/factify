import { IsInt, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateSaleDetailDto {
  @IsOptional()
  @IsInt()
  id_sale: number;

  @IsInt()
  id_product: number;

  @IsOptional()
  @IsString()
  product: string;

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