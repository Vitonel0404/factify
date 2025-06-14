import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";

export class CreateMeasureDto {
  @IsInt()
  id_branch: number;

  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}