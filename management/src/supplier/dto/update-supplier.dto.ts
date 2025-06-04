import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";

export class UpdateSupplierDto {
  @IsInt()
  id_document_type: number;

  @IsString()
  document_number: string;

  @IsString()
  legal_name: string;

  @IsString()
  trade_name: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  contact_phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
