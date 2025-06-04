import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateDocumentTypeDto {
    
    @IsString()
    description: string;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;

    @IsOptional()
    @IsBoolean()
    is_eliminated?: boolean;
}
