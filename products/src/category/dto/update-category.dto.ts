import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateCategoryDto {
    @IsString()
    description: string;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;

}
