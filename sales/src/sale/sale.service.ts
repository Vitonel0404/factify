import { ConflictException, Inject, Injectable, InternalServerErrorException, Type } from '@nestjs/common';
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

type productsToDiscount = {
  id_product: number;
  quantity: number;
};

type productsToMovement = {
  id_branch: number,
  id_product: number,
  quantity: number,
  movement_type: string,
  observation: string
};

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

  async create(createSaleDto: CreateSaleDto, tenancy: string) {
    const { detail, payment } = createSaleDto

    createSaleDto.total = detail.reduce((sum, item) => sum + item.subtotal, 0);

    const correlative = await this.getVoucherNumerExternal(createSaleDto.id_branch, createSaleDto.id_voucher_type, tenancy);

    if (correlative === '') throw new ConflictException('No existe un correlativo vigente.');

    createSaleDto.igv_percent = createSaleDto.total / (1 + (createSaleDto.igv / 100))
    createSaleDto.taxed_operation = createSaleDto.total - createSaleDto.igv_percent;
    createSaleDto.series = correlative.series
    createSaleDto.number = correlative.last_number + 1;

    const newSale = this.saleRepository.create(createSaleDto);
    const savedSale = await this.saleRepository.save(newSale);

    const productsToDiscount: productsToDiscount[] = [];
    const movements: productsToMovement[] = []

    for (const item of detail) {
      item.id_sale = savedSale.id_sale;

      await this.saleDetailService.create(item);

      productsToDiscount.push({
        id_product: +item.id_product,
        quantity: +item.quantity,
      });

      movements.push({
        id_branch: savedSale.id_branch,
        id_product: +item.id_product,
        quantity: +item.quantity,
        movement_type: 'EGRESO',
        observation: `VENTA ${createSaleDto.series}-${createSaleDto.number}`
      })
    }

    for (const pay of payment) {
      pay.id_sale = savedSale.id_sale;
      await this.paymentSaleService.create(pay);
    }

    await this.unitDiscountExternal(productsToDiscount, tenancy);
    await this.createProductMovementExternal(movements, tenancy);
    await this.increaseVoucherNumerExternal(correlative.id_correlative, tenancy);

    return savedSale;
  }

  async getVoucherNumerExternal(id_branch: number, id_voucher: number, tenancy: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.configService.get<string>('URL_MANAGEMENT_SERVICE')}/correlative/voucher/${id_branch}/${id_voucher}`,
          {
            headers: {
              'x-tenant-id': tenancy,
            },
          }
        )
      );
      return response.data;
    } catch (error) {
      console.error('Error en getVoucherNumerExternal:', error?.response?.data || error.message);
      throw new InternalServerErrorException('Error al enviar datos al servicio externo de otención de correlativos');
    }
  }

  async increaseVoucherNumerExternal(id_correlative: number, tenancy: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.configService.get<string>('URL_MANAGEMENT_SERVICE')}/correlative/increase/${id_correlative}`,
          {
            headers: {
              'x-tenant-id': tenancy,
            },
          }
        )
      );
      return response.data;
    } catch (error) {
      console.error('Error en getVoucherNumerExternal:', error?.response?.data || error.message);
      throw new InternalServerErrorException('Error al enviar datos al servicio externo de otención de correlativos');
    }
  }

  async unitDiscountExternal(products: productsToDiscount[], tenancy: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.configService.get<string>('URL_PRODUCTS_SERVICE')}/product/discount`,
          { products },
          {
            headers: {
              'x-tenant-id': tenancy,
            },
          }
        )
      );
      return response.data;
    } catch (error) {
      console.error('Error en unitDiscountExternal:', error?.response?.data || error.message);
      throw new InternalServerErrorException('Error al enviar datos al servicio externo de descuento');
    }
  }

  async createProductMovementExternal(movements: productsToMovement[], tenancy: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.configService.get<string>('URL_PRODUCTS_SERVICE')}/product-movement`, { movements },
          {
            headers: {
              'x-tenant-id': tenancy,
            },
          }
        )
      );
      return response.data;
    } catch (error) {
      console.error('Error en createProductMovementExternal:', error?.response?.data || error.message);
      throw new InternalServerErrorException('Error al enviar datos al servicio externo de registro de movimientos');
    }
  }

  async findAll(id_branch: number) {
    try {
      const result = await this.saleRepository
        .createQueryBuilder('sale')
        .innerJoin('voucher_type', 'vt', 'vt.id_voucher_type = sale.id_voucher_type')
        .select([
          'sale.id_sale AS id_sale',
          'sale.id_sale AS id_voucher_type',
          'vt.description AS voucher_type',
          'sale.series AS series',
          'sale.number AS number',
          'sale.date AS date',
          'sale.total AS total',
          'sale.is_credit AS is_credit',
          'sale.due_date AS due_date',
          'sale.is_active AS is_active',
          'sale.reason_cancellation AS reason_cancellation',
          'sale.send_sunat AS send_sunat',
          'sale.id_quotation AS id_quotation'
        ])
        .where('sale.id_branch = :branch', { branch: id_branch })
        .orderBy('sale.date','DESC')
        .getRawMany();

      return result

    } catch (error) {
      console.error('Error en listar ventas:', error?.response?.data || error.message);
      throw new InternalServerErrorException('Error en listar ventas');
    }
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
