import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException, Type } from '@nestjs/common';
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
import { create_invoice } from './facturador/billing/invoice';
import { firmarXML } from './facturador/billing/firmar_xml';
import { enviarSunat } from './facturador/billing/send_sunat';
import { base64ToZip } from './facturador/utils/base64ToZip';
import { leerCdrXml } from './facturador/utils/readCDR';

type productsToDiscount = {
  id_product: number;
  quantity: number;
};

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
    const response: any = {};
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

    const _sale: any = savedSale;
    _sale.id_sale = savedSale.id_sale;
    _sale.company = createSaleDto.company

    response.status = savedSale ? true : false;
    response.message_sunat = 'Venta registrada correctamente';
    
    if (createSaleDto.series.includes('B') || createSaleDto.series.includes('F')) {
      const res_sunat: any = await this.sentToSunat(_sale, detail, '10167846292.pfx', 'contrasena', tenancy);
      if (res_sunat.status) {
        // await this.mark_sent_sunat(order.id_order);
      }
      response.message_sunat = 'Venta registrada correctamente. '+res_sunat.response_sunat_description;
    }
    
    return response;
  }

  async sentToSunat(sale: { id_sale: number } & CreateSaleDto, detail: any, filename_certificate: string, password_certificate: string, tenancy: string) {
    const voucher_type = await this.getVoucherTypeDataExternal(sale.id_voucher_type, tenancy)
    const _company: any = sale.company;
    const customer: any = await this.getCustomerData(sale.id_sale);

    const _voucher: any = {
      serie: sale.series,
      numero: sale.number,
      fecha_emision: "2023-01-26",
      hora_emision: "10:02:49",
      fecha_vencimiento: sale.due_date ? sale.due_date : null,
      moneda_id: "2",
      forma_pago_id: "1",
      total_gravada: "1",
      total_igv: "90",
      igv_value: sale.igv,
      total_exonerada: "",
      total_inafecta: "",
      tipo_documento_codigo: voucher_type.sunat_code,
      nota: ""
    };

    const codigo_tipo_entidad = (customer.document_number.length === 8) ? '1' : '6';

    const _customer = {
      razon_social_nombres: customer.full_name,
      numero_documento: customer.document_number,
      codigo_tipo_entidad: codigo_tipo_entidad,
      cliente_direccion: customer.address
    };

    const detalle: any[] = [];
    let total_a_pagar = 0;
    let total_gravada = 0;
    let total_exonerada = 0;
    let total_igv = 0;

    const calculate_number_base_price = 1 + (sale.igv / 100);

    for (const element of detail) {
      const item = {
        producto: element.product,
        cantidad: element.quantity,
        precio: element.price,
        tipo_igv_codigo: 10,
        precio_base: element.price / calculate_number_base_price,
        codigo_producto: element.id_product,
        codigo_sunat: '-'
      };

      const subtotal = parseFloat(element.quantity) * parseFloat(element.price);
      total_a_pagar += subtotal;
      total_gravada += subtotal / calculate_number_base_price;

      detalle.push(item);
    }

    _voucher.total_a_pagar = total_a_pagar.toFixed(2);
    _voucher.total_gravada = total_gravada.toFixed(2);
    _voucher.total_exonerada = null;
    _voucher.total_inafecta = null;
    _voucher.total_igv = (total_a_pagar - total_gravada).toFixed(2);

    const now = new Date();

    _voucher.fecha_emision = now.toISOString().split('T')[0];
    _voucher.hora_emision = now.toTimeString().split(' ')[0];

    const nombre_archivo = `${_company.ruc}-${_voucher.tipo_documento_codigo}-${_voucher.serie}-${_voucher.numero}`;

    create_invoice(nombre_archivo, _company, _customer, _voucher, detalle);

    const doc = _voucher.tipo_documento_codigo == '03' ? 'BOLETAS' : 'FACTURAS'
    const route_xml = `${doc}/XML/${nombre_archivo}.xml`
    const route_firmados = `${doc}/FIRMADOS/${nombre_archivo}.xml`
    const route_zip = `${doc}/FIRMADOS/${nombre_archivo}`

    await firmarXML(route_xml, route_firmados, filename_certificate, password_certificate);
    const res = await enviarSunat(_company, route_zip, nombre_archivo);
    if (!res.status) {
      return {
        status: false,
        response_sunat_code: '0',
        response_sunat_description: res.error
      }
    }
    const route_cdr = `${doc}/CDR`
    await base64ToZip(res.result_base64_string[0].applicationResponse, route_cdr, nombre_archivo)
    const res_cdr = await leerCdrXml(route_cdr, nombre_archivo)
    return res_cdr
  }

  async getVoucherTypeDataExternal(id_voucher_type: number, tenancy: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.configService.get<string>('URL_MANAGEMENT_SERVICE')}/voucher-type/${id_voucher_type}`,
          {
            headers: {
              'x-tenant-id': tenancy,
            },
          }
        )
      );
      return response.data;
    } catch (error) {
      console.error('Error en getVoucherTypeDataExternal:', error?.response?.data || error.message);
      throw new InternalServerErrorException('Error al enviar datos al servicio externo de obtención de tipo de comprobante');
    }
  }

  async getCustomerData(id_sale: number) {
    try {
      const data = await this.saleRepository
        .createQueryBuilder('sale')
        .innerJoin('customer', 'customer', 'customer.id_customer = sale.id_customer')
        .addSelect([
          'customer.document_number AS document_number',
          'customer.full_name AS full_name',
          'customer.address AS address'

        ])
        .where('sale.id_sale = :id_sale', { id_sale })
        .getRawOne();

      const customer = {
        document_number: data.document_number,
        full_name: data.full_name,
        address: data.address
      }
      return customer;
    } catch (error) {
      console.log(error);
    }
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
        .orderBy('sale.date', 'DESC')
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

  async remove(id_sale: number, data: { user_name: string, reason: string, is_return: boolean }, tenancy: string) {
    const result = await this.saleRepository.update(
      { id_sale: id_sale },
      {
        is_active: false,
        reason_cancellation: data.reason,
        user_name: data.user_name
      },
    )

    if (result.affected === 0) throw new NotFoundException(`Sale with id ${id_sale} not found`);
    const updatedSale = await this.saleRepository.findOne({ where: { id_sale } });

    if (data.is_return) {
      const detail = await this.saleDetailService.findAll(id_sale);
      const movements: productsToMovement[] = []
      const productsToIncrease: productsToIncrease[] = [];

      for (const item of detail) {
        movements.push({
          id_branch: updatedSale?.id_branch || 0,
          id_product: +item.id_product,
          quantity: +item.quantity,
          movement_type: "INGRESO",
          observation: `DEVOLUCIÓN DE PRODUCTOS | Venta anulada: ${updatedSale?.series}-${updatedSale?.number}`
        });
        productsToIncrease.push({
          id_product: +item.id_product,
          quantity: +item.quantity,
        });
      }

      await this.createProductMovementExternal(movements, tenancy);
      await this.unitIncreaseExternal(productsToIncrease, tenancy);
    }

    return { message: 'Sale was remove successfull' };
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

}
