import { IsInt, IsNumber, IsOptional, IsPositive } from "class-validator";

export class CreatePurchaseDetailDto {
  @IsOptional()
  @IsInt()
  id_purchase: number;

  @IsInt()
  id_product: number;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsInt()
  @IsPositive()
  quantity: number;

  @IsNumber()
  @IsPositive()
  subtotal: number;
}
