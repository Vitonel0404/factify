import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMeasureDto } from './dto/create-measure.dto';
import { UpdateMeasureDto } from './dto/update-measure.dto';
import { DataSource, Repository } from 'typeorm';
import { Measure } from './entities/measure.entity';
import { TENANT_CONNECTION } from 'src/provider/tenant.provider';

@Injectable()
export class MeasureService {
  private readonly measureRepository: Repository<Measure>

  constructor(@Inject(TENANT_CONNECTION) private readonly connection: DataSource) {
    this.measureRepository = this.connection.getRepository(Measure);
  }

  create(createMeasureDto: CreateMeasureDto) {
    try {
      const new_measure = this.measureRepository.create(createMeasureDto);
      return this.measureRepository.save(new_measure);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.measureRepository.find({
        where: { is_eliminated: false }
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findOne(id_measure: number) {
    try {
      return this.measureRepository.findOneBy({ id_measure });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id_measure: number, updateMeasureDto: UpdateMeasureDto) {
    try {
      const measure = await this.measureRepository.findOne({ where: { id_measure } });

      if (!measure) throw new NotFoundException(`Measure with id ${id_measure} not found`);

      const updated = Object.assign(measure, updateMeasureDto);

      return await this.measureRepository.save(updated);

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id_measure: number) {
    try {
      const result = await this.measureRepository.update(
        { id_measure },
        { is_eliminated: true }
      );
      if (result.affected === 0) throw new NotFoundException(`Measure with id ${id_measure} not found`);
      return { message: 'Measure was remove successfull' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
