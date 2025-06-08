import { IsArray, ValidateNested, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

class ProductDiscountDto {
  @IsInt()
  id_product: number;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class DiscountProductsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDiscountDto)
  products: ProductDiscountDto[];
}