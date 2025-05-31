import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BranchService {

  constructor(@InjectRepository(Branch) private branchRepository: Repository<Branch>) { }

  async create(createBranchDto: CreateBranchDto) {
    try {
      const new_branch = this.branchRepository.create(createBranchDto);
      return await this.branchRepository.save(new_branch);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(id_company: number) {
    try {
      return await this.branchRepository.find({ where: { id_company } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id_branch: number) {
    try {
      return await this.branchRepository.findOne({ where: { id_branch } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id_branch: number, updateBranchDto: UpdateBranchDto) {
    const branch = await this.branchRepository.findOne({ where: { id_branch } });

    if (!branch) {
      throw new NotFoundException(`Branch with id ${id_branch} not found`);
    }

    const updated = Object.assign(branch, updateBranchDto);
    return await this.branchRepository.save(updated);
  }

  async remove(id_branch: number) {
    const result = await this.branchRepository.update(
      { id_branch },
      { is_active: false }
    );

    if (result.affected === 0) {
      throw new NotFoundException(`Branch with id ${id_branch} not found`);
    }

    return { message: 'Branch is not active successfully' };
  }
}
