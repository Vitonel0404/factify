import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePurchaseOrderDetailDto } from './dto/create-purchase_order_detail.dto';
import { UpdatePurchaseOrderDetailDto } from './dto/update-purchase_order_detail.dto';
import { TENANT_CONNECTION } from 'src/provider/tenant.provider';
import { DataSource, Repository } from 'typeorm';
import { PurchaseOrderDetail } from './entities/purchase_order_detail.entity';

@Injectable()
export class PurchaseOrderDetailService {
  private readonly purchaseOrderDetailRepository: Repository<PurchaseOrderDetail>

  constructor(@Inject(TENANT_CONNECTION) private readonly connection: DataSource) {
    this.purchaseOrderDetailRepository = this.connection.getRepository(PurchaseOrderDetail);
  }

  create(createPurchaseOrderDetailDto: CreatePurchaseOrderDetailDto) {
    const new_purchaseOrder = this.purchaseOrderDetailRepository.create(createPurchaseOrderDetailDto);
    return this.purchaseOrderDetailRepository.save(new_purchaseOrder);
  }

  async findAll(id_purchase_order: number) {
    try {
      const result = await this.purchaseOrderDetailRepository
        .createQueryBuilder('purchase_order_detail')
        .innerJoin('product', 'p', 'p.id_product = purchase_order_detail.id_product')
        .innerJoin('measure', 'mea', 'mea.id_measure = p.id_measure')
        .select([
          'purchase_order_detail.id_purchase_order_detail AS id_purchase_order_detail',
          'p.description AS product',
          'mea.description AS measure',
          'purchase_order_detail.price AS price',
          'purchase_order_detail.quantity AS quantity',
          'purchase_order_detail.subtotal AS subtotal'
        ])
        .where('purchase_order_detail.id_purchase_order = :id_purchase_order', { id_purchase_order: id_purchase_order })
        .getRawMany();
      return result
    } catch (error) {
      console.error('Error en listar detalle de orden:', error?.response?.data || error.message);
      throw new InternalServerErrorException('Error en listar detalle de orden');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} purchaseOrderDetail`;
  }

  update(id: number, updatePurchaseOrderDetailDto: UpdatePurchaseOrderDetailDto) {
    return `This action updates a #${id} purchaseOrderDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchaseOrderDetail`;
  }
}
