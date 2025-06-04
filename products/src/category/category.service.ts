import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { TENANT_CONNECTION } from 'src/provider/tenant.provider';
import { DataSource, Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  private readonly categoryRepository: Repository<Category>

  constructor(@Inject(TENANT_CONNECTION) private readonly connection: DataSource) {
    this.categoryRepository = this.connection.getRepository(Category);
  }

  create(createCategoryDto: CreateCategoryDto) {
    try {
      const new_category = this.categoryRepository.create(createCategoryDto);
      return this.categoryRepository.save(new_category);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.categoryRepository.find({
        where: { is_eliminated: false }
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findOne(id_category: number) {
    try {
      return this.categoryRepository.findOneBy({ id_category });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id_category: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoryRepository.findOne({ where: { id_category } });

      if (!category) throw new NotFoundException(`Category with id ${id_category} not found`);

      const updated = Object.assign(category, updateCategoryDto);

      return await this.categoryRepository.save(updated);

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id_category: number) {
    try {
      const result = await this.categoryRepository.update(
        { id_category },
        { is_eliminated: true }
      );
      if (result.affected === 0) throw new NotFoundException(`Category with id ${id_category} not found`);
      return { message: 'Category was remove successfull' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
