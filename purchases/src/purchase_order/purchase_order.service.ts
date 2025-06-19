import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { TENANT_CONNECTION } from 'src/provider/tenant.provider';
import { DataSource, Repository } from 'typeorm';
import { PurchaseOrder } from './entities/purchase_order.entity';
import { PurchaseOrderDetailService } from 'src/purchase_order_detail/purchase_order_detail.service';
import { CreatePurchaseOrderDto } from './dto/create-purchase_order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase_order.dto';

@Injectable()
export class PurchaseOrderService {
  private readonly purchaseOrderRepository: Repository<PurchaseOrder>

  constructor(
    @Inject(TENANT_CONNECTION) private readonly connection: DataSource,
    private readonly purchaseOrderDetailService: PurchaseOrderDetailService,

  ) {
    this.purchaseOrderRepository = this.connection.getRepository(PurchaseOrder);
  }

  async create(createPurchaseOrderDto: CreatePurchaseOrderDto, id_branch: number) {
    const { detail } = createPurchaseOrderDto

    createPurchaseOrderDto.order_number = await this.getPurchaseOrderNumber(id_branch);
    createPurchaseOrderDto.total = detail.reduce((sum, item) => sum + item.subtotal, 0);

    createPurchaseOrderDto.igv_percent = createPurchaseOrderDto.total / (1 + (createPurchaseOrderDto.igv / 100))
    createPurchaseOrderDto.taxed_operation = createPurchaseOrderDto.total - createPurchaseOrderDto.igv_percent;

    const newPurchaseOrder = this.purchaseOrderRepository.create(createPurchaseOrderDto);
    const savedPurchaseOrder = await this.purchaseOrderRepository.save(newPurchaseOrder);


    for (const item of detail) {
      item.id_purchase_order = savedPurchaseOrder.id_purchase_order;
      await this.purchaseOrderDetailService.create(item);
    }

    return savedPurchaseOrder;
  }

  async getPurchaseOrderNumber(id_branch: number): Promise<number> {
    const purchase_order = await this.purchaseOrderRepository.findOne({
      where: { id_branch },
      order: { id_purchase_order: 'DESC' }
    });
    if (!purchase_order) return 1
    return purchase_order.id_purchase_order + 1
  }

  async findAll(id_branch: number) {
        try {
      const result = await this.purchaseOrderRepository
        .createQueryBuilder('purchase_order')
        .innerJoin('supplier', 's', 's.id_supplier = purchase_order.id_supplier')
        .select([
          'purchase_order.id_purchase_order AS id_purchase_order',
          'purchase_order.order_number AS order_number',
          's.trade_name AS supplier',
          'purchase_order.date AS date',
          'purchase_order.total AS total',
          'purchase_order.is_active AS is_active',
          'purchase_order.reason_cancellation AS reason_cancellation',
        ])
        .where('purchase_order.id_branch = :branch', { branch: id_branch })
        .orderBy('purchase_order.date', 'DESC')
        .getRawMany();

      return result

    } catch (error) {
      console.error('Error en listar órdenes de compra:', error?.response?.data || error.message);
      throw new InternalServerErrorException('Error en listar órdenes de compra');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} purchaseOrderOrder`;
  }

  update(id: number, updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    return `This action updates a #${id} purchaseOrderOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchaseOrderOrder`;
  }
}
