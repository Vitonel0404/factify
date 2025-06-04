import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateMeasureDto {
    @IsString()
    description: string;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}
