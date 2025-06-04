import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreatePaymentMethodDto {
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}