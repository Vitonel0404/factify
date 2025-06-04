import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateSupplierDto {
  @IsInt()
  id_branch: number;

  @IsInt()
  id_document_type: number;

  @IsString()
  document_number: string;

  @IsOptional()
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
}
