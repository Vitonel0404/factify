import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCreditNoteDetailDto } from './dto/create-credit_note_detail.dto';
import { UpdateCreditNoteDetailDto } from './dto/update-credit_note_detail.dto';
import { CreditNote } from 'src/credit_note/entities/credit-note.entity';
import { TENANT_CONNECTION } from 'src/provider/tenant.provider';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CreditNoteDetailService {
  private readonly creditNoteDetailRepository: Repository<CreditNote>

  constructor(@Inject(TENANT_CONNECTION) private readonly connection: DataSource) {
    this.creditNoteDetailRepository = this.connection.getRepository(CreditNote);
  }

  create(createCreditNoteDetailDto: CreateCreditNoteDetailDto) {
    const new_sale = this.creditNoteDetailRepository.create(createCreditNoteDetailDto);
    return this.creditNoteDetailRepository.save(new_sale);
  }

  async findAll(id_credit_note: number) {
    try {
      const result = await this.creditNoteDetailRepository
        .createQueryBuilder('credit_note_detail')
        .innerJoin('product', 'p', 'p.id_product = credit_note_detail.id_product')
        .innerJoin('measure', 'mea', 'mea.id_measure = p.id_measure')
        .select([
          'credit_note_detail.id_credit_note_detail AS id_credit_note_detail',
          'credit_note_detail.id_product AS id_product',
          'p.description AS product',
          'mea.description AS measure',
          'credit_note_detail.price AS price',
          'credit_note_detail.quantity AS quantity',
          'credit_note_detail.subtotal AS subtotal'
        ])
        .where('credit_note_detail.id_credit_note = :id_credit_note', { id_credit_note: id_credit_note })
        .getRawMany();
      return result
    } catch (error) {
      console.error('Error en listar detalle de nota de crédito:', error?.response?.data || error.message);
      throw new InternalServerErrorException('Error en listar detalle de nota de crédito');
    }

  }

  findOne(id: number) {
    return `This action returns a #${id} creditNoteDetail`;
  }

  update(id: number, updateCreditNoteDetailDto: UpdateCreditNoteDetailDto) {
    return `This action updates a #${id} creditNoteDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} creditNoteDetail`;
  }
}
