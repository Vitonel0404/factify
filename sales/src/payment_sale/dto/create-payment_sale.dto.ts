import { IsInt, IsNumber, IsOptional } from "class-validator";

export class CreatePaymentSaleDto {
  @IsOptional()
  @IsInt()
  id_sale: number;

  @IsInt()
  id_payment_method: number;

  @IsNumber()
  amount: number;
}