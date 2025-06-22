import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePurchaseDetailDto } from './dto/create-purchase_detail.dto';
import { UpdatePurchaseDetailDto } from './dto/update-purchase_detail.dto';
import { DataSource, Repository } from 'typeorm';
import { PurchaseDetail } from './entities/purchase_detail.entity';
import { TENANT_CONNECTION } from 'src/provider/tenant.provider';

@Injectable()
export class PurchaseDetailService {
  private readonly purchaseDetailRepository: Repository<PurchaseDetail>

  constructor(@Inject(TENANT_CONNECTION) private readonly connection: DataSource) {
    this.purchaseDetailRepository = this.connection.getRepository(PurchaseDetail);
  }

  async create(createPurchaseDetailDto: CreatePurchaseDetailDto) {
    const new_purchase = this.purchaseDetailRepository.create(createPurchaseDetailDto);
    return this.purchaseDetailRepository.save(new_purchase);
  }

  async findAll(id_purchase: number) {
    try {
      const result = await this.purchaseDetailRepository
        .createQueryBuilder('purchase_detail')
        .innerJoin('product', 'p', 'p.id_product = purchase_detail.id_product')
        .innerJoin('measure', 'mea', 'mea.id_measure = p.id_measure')
        .select([
          'purchase_detail.id_purchase_detail AS id_purchase_detail',
          'purchase_detail.id_product AS id_product',
          'p.description AS product',
          'mea.description AS measure',
          'purchase_detail.price AS price',
          'purchase_detail.quantity AS quantity',
          'purchase_detail.subtotal AS subtotal'
        ])
        .where('purchase_detail.id_purchase = :purchase', { purchase: id_purchase })
        .getRawMany();
      return result
    } catch (error) {
      console.error('Error en listar detalle de compra:', error?.response?.data || error.message);
      throw new InternalServerErrorException('Error en listar detalle de compra');
    }

  }

  // findOne(id: number) {
  //   return `This action returns a #${id} purchaseDetail`;
  // }

  update(id: number, updatePurchaseDetailDto: UpdatePurchaseDetailDto) {
    return `This action updates a #${id} purchaseDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchaseDetail`;
  }
}
