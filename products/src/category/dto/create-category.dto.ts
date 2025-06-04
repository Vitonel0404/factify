import { IsInt, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsInt()
    id_branch: number;

    @IsString()
    description: string;
}
