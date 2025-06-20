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
    try {
      const new_movement = this.productMovementRepository.create(createProductMovementDto);
      return this.productMovementRepository.save(new_movement);
    } catch (error) {
      console.log(error);
      
    }

  }

  async findAll(id_branch: number) {
    try {
      const result = await this.productMovementRepository
        .createQueryBuilder('product_movement')
        .innerJoin('product', 'p', 'p.id_product = product_movement.id_product')
        .select([
          'product_movement.id_movement AS id_movement',
          'product_movement.id_product AS id_product ',
          'p.description AS product',
          'product_movement.movement_type AS movement_type',
          'product_movement.quantity AS quantity',
          'product_movement.observation AS observation',
          'product_movement.created_at AS created_at'
        ])
        .where('product_movement.id_branch = :branch', { branch: id_branch })
        .orderBy('product_movement.created_at', 'DESC')
        .getRawMany();

      return result

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findOne(id_movement: number) {
    try {
      return this.productMovementRepository.findOneBy({ id_movement });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
