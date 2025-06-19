import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { DataSource, Repository } from 'typeorm';
import { Quotation } from './entities/quotation.entity';
import { TENANT_CONNECTION } from 'src/provider/tenant.provider';
import { QuotationDetailService } from 'src/quotation_detail/quotation_detail.service';

@Injectable()
export class QuotationService {
  private readonly quotationRepository: Repository<Quotation>

  constructor(
    @Inject(TENANT_CONNECTION) private readonly connection: DataSource,
    private readonly quotationDetailService: QuotationDetailService,
  ) {
    this.quotationRepository = this.connection.getRepository(Quotation);

  }

  async create(createQuotationDto: CreateQuotationDto, id_branch: number) {
    const { detail } = createQuotationDto

    createQuotationDto.quotation_number = await this.getQuotationNumber(id_branch);
    createQuotationDto.total = detail.reduce((sum, item) => sum + item.subtotal, 0);

    createQuotationDto.igv_percent = createQuotationDto.total / (1 + (createQuotationDto.igv / 100))
    createQuotationDto.taxed_operation = createQuotationDto.total - createQuotationDto.igv_percent;

    const newQuotation = this.quotationRepository.create(createQuotationDto);
    const savedQuotation = await this.quotationRepository.save(newQuotation);


    for (const item of detail) {
      item.id_quotation = savedQuotation.id_quotation;
      await this.quotationDetailService.create(item);
    }

    return savedQuotation;
  }

  async getQuotationNumber(id_branch: number): Promise<number> {
    const quotation = await this.quotationRepository.findOne({
      where: { id_branch },
      order: { id_quotation: 'DESC' }
    });
    if (!quotation) return 1
    return quotation.quotation_number + 1
  }

  async findAll(id_branch: number) {
    try {
      const result = await this.quotationRepository
        .createQueryBuilder('quotation')
        .innerJoin('customer', 'c', 'c.id_customer = quotation.id_customer')
        .select([
          'quotation.id_quotation AS id_quotation',
          'quotation.quotation_number AS quotation_number',
          'c.full_name AS customer',
          'quotation.date AS date',
          'quotation.total AS total',
          'quotation.is_active AS is_active',
          'quotation.reason_cancellation AS reason_cancellation',
        ])
        .where('quotation.id_branch = :branch', { branch: id_branch })
        .orderBy('quotation.date', 'DESC')
        .getRawMany();

      return result

    } catch (error) {
      console.error('Error en listar cotizaciones:', error?.response?.data || error.message);
      throw new InternalServerErrorException('Error en listar cotizaciones');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} quotation`;
  }

  update(id: number, updateQuotationDto: UpdateQuotationDto) {
    return `This action updates a #${id} quotation`;
  }

  remove(id: number) {
    return `This action removes a #${id} quotation`;
  }
}
