import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { DataSource, Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { TENANT_CONNECTION } from 'src/provider/tenant.provider';


@Injectable()
export class CustomerService {
  private readonly customerRepository : Repository<Customer>

  constructor(@Inject(TENANT_CONNECTION) connection : DataSource){
    this.customerRepository = connection.getRepository(Customer);
  }

  create(createCustomerDto: CreateCustomerDto) {
    try {
      const new_customer = this.customerRepository.create(createCustomerDto);
      return this.customerRepository.save(new_customer);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findAll() {
    return this.customerRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
