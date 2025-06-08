import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { DataSource, Repository } from 'typeorm';
import { TENANT_CONNECTION } from 'src/provider/tenant.provider';

@Injectable()
export class ProductService {
  private readonly productRepository: Repository<Product>

  constructor(@Inject(TENANT_CONNECTION) private readonly connection: DataSource) {
    this.productRepository = this.connection.getRepository(Product);
  }

  create(createProductDto: CreateProductDto) {
    try {
      const new_product = this.productRepository.create(createProductDto);
      return this.productRepository.save(new_product);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.productRepository.find({
        where: { is_eliminated: false }
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findOne(id_product: number) {
    try {
      return this.productRepository.findOneBy({ id_product });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id_product: number, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productRepository.findOne({ where: { id_product } });

      if (!product) throw new NotFoundException(`Product with id ${id_product} not found`);

      const updated = Object.assign(product, updateProductDto);

      return await this.productRepository.save(updated);

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id_product: number) {
    try {
      const result = await this.productRepository.update(
        { id_product },
        { is_eliminated: true }
      );
      if (result.affected === 0) throw new NotFoundException(`Product with id ${id_product} not found`);
      return { message: 'Product was remove successfull' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async discountProducts(products: { id_product: number; quantity: number }[]) {
    const results: {
      id_product: number;
      status: 'ok' | 'error';
      error?: string;
    }[] = [];

    for (const product of products) {
      try {
        await this.unitDiscount(product.id_product, product.quantity);
        results.push({ id_product: product.id_product, status: 'ok' });
      } catch (error) {
        results.push({
          id_product: product.id_product,
          status: 'error',
          error: error?.message ?? 'Unknown error',
        });
      }
    }

    return { summary: results };
  }

  async unitDiscount(id_product: number, unitsToDiscount: number) {
    const product = await this.productRepository.findOne({ where: { id_product } });

    if (!product) {
      throw new NotFoundException(`Product with id ${id_product} not found`);
    }

    const availableStock = Number(product.stock);
    if (availableStock < unitsToDiscount) {
      throw new BadRequestException(
        `Insufficient stock. Available: ${availableStock}, requested: ${unitsToDiscount}`
      );
    }

    product.stock = availableStock - unitsToDiscount;
    return this.productRepository.save(product);
  }

  async unitIncrease(id_product: number, unitsToIncrease: number) {
    try {
      const product = await this.productRepository.findOne({ where: { id_product } });
      console.log(product);

      if (!product) {
        throw new NotFoundException(`Product with id ${id_product} not found`);
      }

      product.stock = Number(product.stock) + Number(unitsToIncrease);

      return await this.productRepository.save(product);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

}
