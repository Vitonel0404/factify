import { IsNumber, IsObject, IsPositive, IsString, MaxLength } from "class-validator";

export class CreatePlanDto {
  @IsString()
  @MaxLength(250)
  name: string;

  @IsString()
  @MaxLength(250)
  description?: string;

  @IsNumber()
  @IsPositive()
  price: number;
  
  @IsObject()
  features?: any;
}