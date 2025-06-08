import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString, IsIn, IsArray, ValidateNested } from 'class-validator';

 export class CreateProductMovementDto {
  @IsInt()
  id_product: number;

  @IsInt()
  id_branch: number;

  @IsString()
  @IsIn(['INGRESO', 'EGRESO'], {
    message: 'El tipo de mivimiento debe ser uno de: INGRESO o EGRESO',
  })
  movement_type: string;

  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsString()
  observation?: string;
}

export class CreateProductMovementsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductMovementDto)
  movements: CreateProductMovementDto[];
}