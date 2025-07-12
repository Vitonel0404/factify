import { IsInt, IsNumber, IsOptional, IsPositive } from "class-validator";

export class CreateCreditNoteDetailDto {
    
  @IsInt()
  @IsOptional()
  id_credit_note: number;

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