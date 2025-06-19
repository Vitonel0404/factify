import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { DataSource, Repository } from 'typeorm';
import { Purchase } from './entities/purchase.entity';
import { TENANT_CONNECTION } from 'src/provider/tenant.provider';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { PurchaseDetailService } from 'src/purchase_detail/purchase_detail.service';
import { firstValueFrom } from 'rxjs';

type productsToIncrease = {
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
export class PurchaseService {
  private readonly purchaseRepository: Repository<Purchase>

  constructor(
    @Inject(TENANT_CONNECTION) private readonly connection: DataSource,
    private readonly purchaseDetailService: PurchaseDetailService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService

  ) {
    this.purchaseRepository = this.connection.getRepository(Purchase);
  }

  async create(createPurchaseDto: CreatePurchaseDto, tenancy: string) {
    const { detail } = createPurchaseDto

    createPurchaseDto.total = detail.reduce((sum: any, item: any) => sum + item.subtotal, 0);

    createPurchaseDto.igv = 10,
    createPurchaseDto.igv_percent = 10
    createPurchaseDto.taxed_operation = 10;
    // createPurchaseDto.series = 'F001'
    // createPurchaseDto.number = 10;

    const newPurchase = this.purchaseRepository.create(createPurchaseDto);
    const savedPurchase = await this.purchaseRepository.save(newPurchase);

    const productsToIncrease: productsToIncrease[] = [];
    const movements: productsToMovement[] = []

    for (const item of detail) {
      item.id_purchase = savedPurchase.id_purchase;
      await this.purchaseDetailService.create(item);

      productsToIncrease.push({
        id_product: +item.id_product,
        quantity: +item.quantity,
      });

      movements.push({
        id_branch: savedPurchase.id_branch,
        id_product: +item.id_product,
        quantity: +item.quantity,
        movement_type: 'INGRESO',
        observation: `COMPRA ${createPurchaseDto.series}-${createPurchaseDto.number}`
      })
    }

    await this.unitIncreaseExternal(productsToIncrease, tenancy)
    await this.createProductMovementExternal(movements, tenancy)

    return savedPurchase;
  }

  async unitIncreaseExternal(products: productsToIncrease[], tenancy: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.configService.get<string>('URL_PRODUCTS_SERVICE')}/product/increase`,
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
      console.error('Error en unitIncreaseExternal:', error?.response?.data || error.message);
      throw new InternalServerErrorException('Error al enviar datos al servicio externo de incremento');
    }
  }

  async createProductMovementExternal(movements: productsToMovement[], tenancy: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.configService.get<string>('URL_PRODUCTS_SERVICE')}/product-movement`,
          { movements },
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
      const result = await this.purchaseRepository
        .createQueryBuilder('purchase')
        .innerJoin('voucher_type', 'vt', 'vt.id_voucher_type = purchase.id_voucher_type')
        .innerJoin('supplier', 's', 's.id_supplier = purchase.id_supplier')
        .select([
          'purchase.id_purchase AS id_purchase',
          'purchase.id_purchase AS id_voucher_type',
          'vt.description AS voucher_type',
          's.trade_name AS supplier',
          'purchase.series AS series',
          'purchase.number AS number',
          'purchase.date AS date',
          'purchase.total AS total',
          'purchase.is_active AS is_active',
          'purchase.id_purchase_order AS id_purchase_order'
        ])
        .where('purchase.id_branch = :branch', { branch: id_branch })
        .getRawMany();
        
      return result

    } catch (error) {
      console.error('Error en listar ventas:', error?.response?.data || error.message);
      throw new InternalServerErrorException('Error en listar ventas');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} purchase`;
  }

  update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    return `This action updates a #${id} purchase`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchase`;
  }
}
