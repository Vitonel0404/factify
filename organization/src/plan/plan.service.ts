import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from './entities/plan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlanService {

  constructor(@InjectRepository(Plan) private planRepository: Repository<Plan>) { }

  async create(createPlanDto: CreatePlanDto) {
    try {
      const new_plan = this.planRepository.create(createPlanDto);
      return await this.planRepository.save(new_plan);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.planRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAllActive() {
    try {
      return await this.planRepository.findBy({ is_active: true });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id_plan: number) {
    try {
      return await this.planRepository.findBy({ id_plan });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id_plan: number, updatePlanDto: UpdatePlanDto) {
    const branch = await this.planRepository.findOne({ where: { id_plan } });

    if (!branch) {
      throw new NotFoundException(`Plan with id ${id_plan} not found`);
    }

    const updated = Object.assign(branch, updatePlanDto);
    return await this.planRepository.save(updated);
  }

  async remove(id_plan: number) {
    const result = await this.planRepository.update(
      { id_plan },
      { is_active: false }
    );

    if (result.affected === 0) {
      throw new NotFoundException(`Plan with id ${id_plan} not found`);
    }

    return { message: 'Plan is not active successfully' };
  }
}
