import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";

export class UpdateCategoryDto {
    @IsInt()
    id_branch: number;

    @IsString()
    description: string;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;

}
