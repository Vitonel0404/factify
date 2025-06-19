import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateQuotationDetailDto } from './dto/create-quotation_detail.dto';
import { UpdateQuotationDetailDto } from './dto/update-quotation_detail.dto';
import { DataSource, Repository } from 'typeorm';
import { TENANT_CONNECTION } from 'src/provider/tenant.provider';
import { QuotationDetail } from './entities/quotation_detail.entity';

@Injectable()
export class QuotationDetailService {
  private readonly quotationDetailRepository: Repository<QuotationDetail>

  constructor(@Inject(TENANT_CONNECTION) private readonly connection: DataSource) {
    this.quotationDetailRepository = this.connection.getRepository(QuotationDetail);
  }

  create(createQuotationDetailDto: CreateQuotationDetailDto) {
    const new_quotation = this.quotationDetailRepository.create(createQuotationDetailDto);
    return this.quotationDetailRepository.save(new_quotation);
  }

  async findAll(id_quotation: number) {
    try {
      const result = await this.quotationDetailRepository
        .createQueryBuilder('quotation_detail')
        .innerJoin('product', 'p', 'p.id_product = quotation_detail.id_product')
        .innerJoin('measure', 'mea', 'mea.id_measure = p.id_measure')
        .select([
          'quotation_detail.id_quotation_detail AS id_quotation_detail',
          'p.description AS product',
          'mea.description AS measure',
          'quotation_detail.price AS price',
          'quotation_detail.quantity AS quantity',
          'quotation_detail.subtotal AS subtotal'
        ])
        .where('quotation_detail.id_quotation = :quotation', { quotation: id_quotation })
        .getRawMany();
      return result
    } catch (error) {
      console.error('Error en listar detalle de cotizaciones:', error?.response?.data || error.message);
      throw new InternalServerErrorException('Error en listar detalle de cotizaciones');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} quotationDetail`;
  }

  update(id: number, updateQuotationDetailDto: UpdateQuotationDetailDto) {
    return `This action updates a #${id} quotationDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} quotationDetail`;
  }
}
