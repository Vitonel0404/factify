import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './entities/sale.entity';
import { DataSource, Repository } from 'typeorm';
import { TENANT_CONNECTION } from 'src/provider/tenant.provider';
import { SaleDetailService } from 'src/sale_detail/sale_detail.service';
import { PaymentSaleService } from 'src/payment_sale/payment_sale.service';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SaleService {
  private readonly saleRepository: Repository<Sale>

  constructor(
    @Inject(TENANT_CONNECTION) private readonly connection: DataSource,
    private readonly saleDetailService: SaleDetailService,
    private readonly paymentSaleService: PaymentSaleService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService

  ) {
    this.saleRepository = this.connection.getRepository(Sale);

  }

  async create(createSaleDto: CreateSaleDto, tenancy : string) {
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
      await this.unitDiscountExternal(+item.id_product, +item.quantity, tenancy)
    }
    
    for (const pay of payment) {
      pay.id_sale = savedSale.id_sale;
      await this.paymentSaleService.create(pay);
    }

    return savedSale;
  }

  async unitDiscountExternal(id_product: number, unitsToDiscount: number, tenancy : string){

    console.log(`${this.configService.get<string>('URL_PRODUCTS_SERVICE')}/discount/${id_product}/${unitsToDiscount}`);
    
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.configService.get<string>('URL_PRODUCTS_SERVICE')}/discount/${id_product}/${unitsToDiscount}`,
          {
            headers: {
              'x-tenant-id': tenancy,
            },
          }
        )
      );
      return response.data;
    } catch (error) {
      console.error('Error en postToExternal:', error?.response?.data || error.message);
      throw new InternalServerErrorException('Error al enviar datos al servicio externo de descuento');
    }
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
