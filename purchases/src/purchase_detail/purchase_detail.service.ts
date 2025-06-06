import { Inject, Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all purchaseDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchaseDetail`;
  }

  update(id: number, updatePurchaseDetailDto: UpdatePurchaseDetailDto) {
    return `This action updates a #${id} purchaseDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchaseDetail`;
  }
}
