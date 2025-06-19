import {
  IsInt,
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsEmail,
  IsDate,
  IsDateString,
  IsPositive,
} from 'class-validator';


export class CreateCreditNoteDto {
  @IsInt()
  id_branch: number;

  @IsInt()
  id_voucher_type: number;

  @IsString()
  credit_note_type: string;

  @IsString()
  series: string;

  @IsInt()
  number: number;

  @IsDate()
  date: Date;

  @IsString()
  reference_series: string;

  @IsInt()
  reference_number: number;

  @IsNumber()
  @IsPositive()
  total: number;

  @IsNumber()
  @IsPositive()
  taxed_operation: number;

  @IsNumber()
  @IsPositive()
  igv_percent: number;

  @IsNumber()
  @IsPositive()
  igv: number;

  @IsString()
  user_name: string;

  @IsOptional()
  @IsBoolean()
  send_sunat?: boolean;
}

export class CreateCreditNoteDetailDto {
  @IsInt()
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

export class CreatePurchaseOrderDto {
  @IsInt()
  id_branch: number;

  @IsInt()
  id_supplier: number;

  @IsString()
  @IsPositive()
  order_number: string;

  @IsDate()
  date: Date;

  @IsNumber()
  @IsPositive()
  total: number;

  @IsNumber()
  @IsPositive()
  taxed_operation: number;

  @IsNumber()
  @IsPositive()
  igv_percent: number;

  @IsNumber()
  @IsPositive()
  igv: number;

  @IsString()
  user_name: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsString()
  reason_cancellation?: string;

  @IsOptional()
  @IsString()
  user_name_cancellation?: string;
}

export class CreatePurchaseOrderDetailDto {
  @IsInt()
  id_purchase_order: number;

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