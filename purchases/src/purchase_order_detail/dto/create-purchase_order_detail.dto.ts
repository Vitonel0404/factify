import { IsInt, IsNumber, IsOptional, IsPositive } from "class-validator";

export class CreatePurchaseOrderDetailDto {
    @IsOptional()
    @IsInt()
    id_purchase_order: number;

    @IsInt()
    id_product: number;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsInt()
    @IsPositive()
    quantity: number;

    @IsNumber()
    @IsPositive()
    subtotal: number;
}