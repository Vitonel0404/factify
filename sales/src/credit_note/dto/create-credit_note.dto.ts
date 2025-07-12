import { IsBoolean, IsDate, IsInt, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateCreditNoteDto {
  @IsInt()
  id_branch: number;

  @IsInt()
  @IsOptional()
  id_sale: number;

  @IsInt()
  @IsOptional()
  id_voucher_type: number;

  @IsString()
  @IsOptional()
  credit_note_type: string;

  @IsString()
  @IsOptional()
  series: string;

  @IsInt()
  @IsOptional()
  number: number;

  @IsDate()
  @IsOptional()
  date: Date;

  @IsString()
  @IsOptional()
  reference_series: string;

  @IsInt()
  @IsOptional()
  reference_number: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  total: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  taxed_operation: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  igv_percent: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  igv: number;

  @IsString()
  user_name: string;

  @IsOptional()
  @IsBoolean()
  send_sunat?: boolean;
}