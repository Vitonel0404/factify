import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateVoucherTypeDto {
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  sunat_code: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}