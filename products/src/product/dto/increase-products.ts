import { IsArray, ValidateNested, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

class ProductIncreaseDto {
  @IsInt()
  id_product: number;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class IncreaseProductsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductIncreaseDto)
  products: ProductIncreaseDto[];
}