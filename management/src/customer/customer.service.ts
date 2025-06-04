import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { DataSource, Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { TENANT_CONNECTION } from 'src/provider/tenant.provider';


@Injectable()
export class CustomerService {
  private readonly customerRepository: Repository<Customer>

  constructor(@Inject(TENANT_CONNECTION) private readonly connection: DataSource) {
    this.customerRepository = this.connection.getRepository(Customer);
  }

  create(createCustomerDto: CreateCustomerDto) {
    try {
      const new_customer = this.customerRepository.create(createCustomerDto);
      return this.customerRepository.save(new_customer);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.customerRepository.find({
        where: { is_eliminated: false }
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findOne(id_customer: number) {
    try {
      return this.customerRepository.findOneBy({ id_customer });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id_customer: number, updateCustomerDto: UpdateCustomerDto) {
    try {
      const customer = await this.customerRepository.findOne({ where: { id_customer } });

      if (!customer) throw new NotFoundException(`Customer with id ${id_customer} not found`);

      const updated = Object.assign(customer, updateCustomerDto);

      return await this.customerRepository.save(updated);

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id_customer: number) {
    try {
      const result = await this.customerRepository.update(
        { id_customer },
        { is_eliminated: true }
      );
      if (result.affected === 0) throw new NotFoundException(`Customer with id ${id_customer} not found`);
      return { message: 'Customer was remove successfull' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
