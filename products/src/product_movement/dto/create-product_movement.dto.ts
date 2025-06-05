import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, IsIn } from 'class-validator';

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
