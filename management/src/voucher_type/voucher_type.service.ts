import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateVoucherTypeDto } from './dto/create-voucher_type.dto';
import { UpdateVoucherTypeDto } from './dto/update-voucher_type.dto';
import { DataSource, Repository } from 'typeorm';
import { VoucherType } from './entities/voucher_type.entity';
import { TENANT_CONNECTION } from 'src/provider/tenant.provider';

@Injectable()
export class VoucherTypeService {

  private readonly voucherTypeService: Repository<VoucherType>;

  constructor(@Inject(TENANT_CONNECTION) private readonly connection: DataSource) {
    this.voucherTypeService = this.connection.getRepository(VoucherType);
  }

  create(createVoucherTypeDto: CreateVoucherTypeDto) {
    try {
      const new_voucherType = this.voucherTypeService.create(createVoucherTypeDto);
      return this.voucherTypeService.save(new_voucherType);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.voucherTypeService.find({
        where: { is_eliminated: false }
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findOne(id_voucher_type: number) {
    try {
      return this.voucherTypeService.findOneBy({ id_voucher_type });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id_voucher_type: number, updateVoucherTypeDto: UpdateVoucherTypeDto) {
    try {
      const voucher_type = await this.voucherTypeService.findOne({ where: { id_voucher_type } });

      if (!voucher_type) throw new NotFoundException(`Voucher type with id ${id_voucher_type} not found`);

      const updated = Object.assign(voucher_type, updateVoucherTypeDto);

      return await this.voucherTypeService.save(updated);

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id_voucher_type: number) {
    try {
      const result = await this.voucherTypeService.update(
        { id_voucher_type },
        { is_eliminated: true }
      );
      if (result.affected === 0) throw new NotFoundException(`Voucher type with id ${id_voucher_type} not found`);
      return { message: 'Voucher type was remove successfull' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
