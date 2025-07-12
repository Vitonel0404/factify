import { IsBoolean, IsInt, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateProductDto {
    @IsInt()
    id_category: number;

    @IsInt()
    id_measure: number;

    @IsString()
    description: string;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsNumber()
    @IsPositive()
    purchase_price: number;

    @IsNumber()
    stock: number;

    @IsNumber()
    minimum_stock: number;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}
