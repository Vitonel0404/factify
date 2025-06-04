import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateDocumentTypeDto {
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

}