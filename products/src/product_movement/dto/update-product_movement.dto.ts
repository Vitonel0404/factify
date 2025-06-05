import { PartialType } from '@nestjs/mapped-types';
import { CreateProductMovementDto } from './create-product_movement.dto';

export class UpdateProductMovementDto extends PartialType(CreateProductMovementDto) {}
