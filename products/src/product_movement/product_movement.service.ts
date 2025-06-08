import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';

import { ProductMovement } from './entities/product_movement.entity';
import { DataSource, Repository } from 'typeorm';
import { TENANT_CONNECTION } from 'src/provider/tenant.provider';
import { CreateProductMovementDto, CreateProductMovementsDto } from './dto/create-product_movement.dto';

@Injectable()
export class ProductMovementService {
  private readonly productMovementRepository: Repository<ProductMovement>

  constructor(@Inject(TENANT_CONNECTION) private readonly connection: DataSource) {
    this.productMovementRepository = this.connection.getRepository(ProductMovement);
  }

  async createMovements(movements: CreateProductMovementDto[]) {
    const results: {
      id_product: number;
      status: 'ok' | 'error';
      error?: string;
    }[] = [];

    for (const movement of movements) {
      try {
        await this.create(movement);
        results.push({ id_product: movement.id_product, status: 'ok' });
      } catch (error) {
        results.push({
          id_product: movement.id_product,
          status: 'error',
          error: error?.message ?? 'Unknown error',
        });
      }
    }

    return { summary: results };
  }

  async create(createProductMovementDto: CreateProductMovementDto) {
    const new_movement = this.productMovementRepository.create(createProductMovementDto);
    return this.productMovementRepository.save(new_movement);
  }
}
