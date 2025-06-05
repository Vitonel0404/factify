import { Inject, Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all saleDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} saleDetail`;
  }

  update(id: number, updateSaleDetailDto: UpdateSaleDetailDto) {
    return `This action updates a #${id} saleDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} saleDetail`;
  }
}
