import { Inject, Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './entities/sale.entity';
import { DataSource, Repository } from 'typeorm';
import { TENANT_CONNECTION } from 'src/provider/tenant.provider';
import { SaleDetailService } from 'src/sale_detail/sale_detail.service';
import { PaymentSaleService } from 'src/payment_sale/payment_sale.service';

@Injectable()
export class SaleService {
  private readonly saleRepository: Repository<Sale>


  constructor(
    @Inject(TENANT_CONNECTION) private readonly connection: DataSource,
    private readonly saleDetailService: SaleDetailService,
    private readonly paymentSaleService: PaymentSaleService,

  ) {
    this.saleRepository = this.connection.getRepository(Sale);

  }

  async create(createSaleDto: CreateSaleDto) {
    const { detail, payment } = createSaleDto

    createSaleDto.total = detail.reduce((sum, item) => sum + item.subtotal, 0);

    createSaleDto.igv = 10,
    createSaleDto.igv_percent = 10
    createSaleDto.taxed_operation = 10;
    createSaleDto.series = 'F001'
    createSaleDto.number = 10;

    const newSale = this.saleRepository.create(createSaleDto);
    const savedSale = await this.saleRepository.save(newSale);
   
    for (const item of detail) {
      item.id_sale = savedSale.id_sale;
      await this.saleDetailService.create(item);
    }
    
    for (const pay of payment) {
      pay.id_sale = savedSale.id_sale;
      await this.paymentSaleService.create(pay);
    }

    return savedSale;
  }

  findAll() {
    return `This action returns all sale`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
