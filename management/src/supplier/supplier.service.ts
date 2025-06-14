import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { TENANT_CONNECTION } from 'src/provider/tenant.provider';
import { DataSource, Repository } from 'typeorm';
import { Supplier } from './entities/supplier.entity';

@Injectable()
export class SupplierService {
  private readonly supplierRepository: Repository<Supplier>

  constructor(@Inject(TENANT_CONNECTION) private readonly connection: DataSource) {
    this.supplierRepository = this.connection.getRepository(Supplier);
  }

  create(createSupplierDto: CreateSupplierDto) {
    try {
      const new_supplier = this.supplierRepository.create(createSupplierDto);
      return this.supplierRepository.save(new_supplier);
    } catch (error) {
      console.log(error);
      
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(id_branch : number) {
    try {
      return await this.supplierRepository.find({
        where: { is_eliminated: false, id_branch }
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findOne(id_supplier: number) {
    try {
      return this.supplierRepository.findOneBy({ id_supplier });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id_supplier: number, updateSupplierDto: UpdateSupplierDto) {
    try {
      const supplier = await this.supplierRepository.findOne({ where: { id_supplier } });

      if (!supplier) throw new NotFoundException(`Supplier with id ${id_supplier} not found`);

      const updated = Object.assign(supplier, updateSupplierDto);

      return await this.supplierRepository.save(updated);

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id_supplier: number) {
    try {
      const result = await this.supplierRepository.update(
        { id_supplier },
        { is_eliminated: true }
      );
      if (result.affected === 0) throw new NotFoundException(`Supplier with id ${id_supplier} not found`);
      return { message: 'Supplier was remove successfull' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
