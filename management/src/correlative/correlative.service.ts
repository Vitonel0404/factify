import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCorrelativeDto } from './dto/create-correlative.dto';
import { UpdateCorrelativeDto } from './dto/update-correlative.dto';
import { DataSource, Repository } from 'typeorm';
import { Correlative } from './entities/correlative.entity';
import { TENANT_CONNECTION } from 'src/provider/tenant.provider';

@Injectable()
export class CorrelativeService {
  private readonly correlativeRepository: Repository<Correlative>

  constructor(@Inject(TENANT_CONNECTION) private readonly connection: DataSource) {
    this.correlativeRepository = this.connection.getRepository(Correlative);
  }

  create(createCorrelativeDto: CreateCorrelativeDto) {
    try {
      const new_correlative = this.correlativeRepository.create(createCorrelativeDto);
      return this.correlativeRepository.save(new_correlative);
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(id_branch : number) {
    try {
      const result = await this.correlativeRepository
      .createQueryBuilder('correlative')
      .innerJoin('voucher_type', 'vt', 'vt.id_voucher_type = correlative.id_voucher_type')
      .select([
        'correlative.id_correlative AS id_correlative',
        'correlative.id_branch AS id_branch ',
        'correlative.id_voucher_type AS id_voucher_type',
        'vt.description AS description',
        'correlative.series AS series',
        'correlative.last_number AS last_number',
        'correlative.maximun_correlative AS maximun_correlative',
        'correlative.is_active AS is_active'
      ])
      .where('correlative.is_eliminated = :elim and correlative.id_branch = :branch', { elim: false, branch: id_branch })
      .getRawMany();      
      return result
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findOne(id_correlative: number) {
    try {
      return this.correlativeRepository.findOneBy({ id_correlative });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findOneByVoucher(id_branch: number, id_voucher_type: number) {
    try {
      return this.correlativeRepository.findOneBy({ id_branch, id_voucher_type, is_active : true, is_eliminated : false });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id_correlative: number, updateCorrelativeDto: UpdateCorrelativeDto) {
    try {
      const correlative = await this.correlativeRepository.findOne({ where: { id_correlative } });

      if (!correlative) throw new NotFoundException(`Correlative with id ${id_correlative} not found`);

      const updated = Object.assign(correlative, updateCorrelativeDto);

      return await this.correlativeRepository.save(updated);

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id_correlative: number) {
    try {
      const result = await this.correlativeRepository.update(
        { id_correlative },
        { is_eliminated: true }
      );
      if (result.affected === 0) throw new NotFoundException(`Correlative with id ${id_correlative} not found`);
      return { message: 'Correlative was remove successfull' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
