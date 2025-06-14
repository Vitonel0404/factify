import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSaleDetailDto } from './dto/create-sale_detail.dto';
import { UpdateSaleDetailDto } from './dto/update-sale_detail.dto';
import { DataSource, Repository } from 'typeorm';
import { SaleDetail } from './entities/sale_detail.entity';
import { TENANT_CONNECTION } from 'src/provider/tenant.provider';

@Injectable()
export class SaleDetailService {
  private readonly saleDetailRepository: Repository<SaleDetail>

  constructor(@Inject(TENANT_CONNECTION) private readonly connection: DataSource) {
    this.saleDetailRepository = this.connection.getRepository(SaleDetail);
  }

  create(createSaleDetailDto: CreateSaleDetailDto) {
    const new_sale = this.saleDetailRepository.create(createSaleDetailDto);
    return this.saleDetailRepository.save(new_sale);
  }

  async findAll(id_sale: number) {
    try {
      const result = await this.saleDetailRepository
        .createQueryBuilder('sale_detail')
        .innerJoin('product', 'p', 'p.id_product = sale_detail.id_product')
        .innerJoin('measure', 'mea', 'mea.id_measure = p.id_measure')
        .select([
          'sale_detail.id_sale_detail AS id_sale_detail',
          'p.description AS product',
          'mea.description AS measure',
          'sale_detail.price AS price',
          'sale_detail.quantity AS quantity',
          'sale_detail.subtotal AS subtotal'
        ])
        .where('sale_detail.id_sale = :sale', { sale: id_sale })
        .getRawMany();
      return result
    } catch (error) {
      console.error('Error en listar ventas:', error?.response?.data || error.message);
      throw new InternalServerErrorException('Error en listar detalle de venta');
    }

  }

  update(id: number, updateSaleDetailDto: UpdateSaleDetailDto) {
    return `This action updates a #${id} saleDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} saleDetail`;
  }
}
