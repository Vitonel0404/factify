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

// MEASURE
export class CreateMeasureDto {
  @IsInt()
  id_branch: number;

  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsBoolean()
  is_eliminated?: boolean;
}

// PRODUCT
export class CreateProductDto {
  @IsInt()
  id_branch: number;

  @IsInt()
  id_category: number;

  @IsInt()
  id_measure: number;

  @IsString()
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  stock: number;

  @IsNumber()
  minimum_stock: number;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsBoolean()
  is_eliminated?: boolean;
}

// SALE
export class CreateSaleDto {
  @IsInt()
  id_branch: number;

  @IsInt()
  id_voucher_type: number;

  @IsInt()
  id_customer: number;

  @IsString()
  series: string;

  @IsInt()
  number: number;

  @IsDateString()
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

  @IsOptional()
  @IsBoolean()
  is_credit?: boolean;

  @IsOptional()
  @IsDateString()
  due_date?: Date;

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

  @IsOptional()
  @IsBoolean()
  send_sunat?: boolean;

  @IsOptional()
  @IsInt()
  id_quotation?: number;
}

// SALE DETAIL
export class CreateSaleDetailDto {
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

// PAYMENT SALE
export class CreatePaymentSaleDto {
  @IsInt()
  id_sale: number;

  @IsInt()
  id_payment_method: number;

  @IsNumber()
  amount: number;
}

export class CreateQuotationDto {
  @IsInt()
  id_branch: number;

  @IsInt()
  id_customer: number;

  @IsInt()
  quotation_number: number;

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

export class CreateQuotationDetailDto {
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

export class CreatePurchaseDto {
  @IsInt()
  id_branch: number;

  @IsInt()
  id_supplier: number;

  @IsInt()
  id_voucher_type: number;

  @IsString()
  series: string;

  @IsInt()
  @IsPositive()
  number: number;

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

  @IsOptional()
  @IsInt()
  id_purchase_order?: number;
}

export class CreatePurchaseDetailDto {
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