import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductMovementDto } from './dto/create-product_movement.dto';
import { UpdateProductMovementDto } from './dto/update-product_movement.dto';
import { ProductMovement } from './entities/product_movement.entity';
import { DataSource, Repository } from 'typeorm';
import { TENANT_CONNECTION } from 'src/provider/tenant.provider';

@Injectable()
export class ProductMovementService {
private readonly productMovementRepository: Repository<ProductMovement>

  constructor(@Inject(TENANT_CONNECTION) private readonly connection: DataSource) {
    this.productMovementRepository = this.connection.getRepository(ProductMovement);
  }

  create(createProductMovementDto: CreateProductMovementDto) {
    try {
      const new_movement = this.productMovementRepository.create(createProductMovementDto);
      return this.productMovementRepository.save(new_movement);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
