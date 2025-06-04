import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { DataSource, Repository } from 'typeorm';
import { PaymentMethod } from './entities/payment-method.entity';
import { TENANT_CONNECTION } from 'src/provider/tenant.provider';

@Injectable()
export class PaymentMethodService {

  private readonly paymentMethodService: Repository<PaymentMethod>;

  constructor(@Inject(TENANT_CONNECTION) private readonly connection: DataSource) {
    this.paymentMethodService = this.connection.getRepository(PaymentMethod);
  }

  create(createPaymentMethodDto: CreatePaymentMethodDto) {
    try {
      const new_paymentMethod = this.paymentMethodService.create(createPaymentMethodDto);
      return this.paymentMethodService.save(new_paymentMethod);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.paymentMethodService.find({
        where: { is_eliminated: false }
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findOne(id_payment_method: number) {
    try {
      return this.paymentMethodService.findOneBy({ id_payment_method });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id_payment_method: number, updatePaymentMethodDto: UpdatePaymentMethodDto) {
    try {
      const payment_method = await this.paymentMethodService.findOne({ where: { id_payment_method } });

      if (!payment_method) throw new NotFoundException(`Payment method with id ${id_payment_method} not found`);

      const updated = Object.assign(payment_method, updatePaymentMethodDto);

      return await this.paymentMethodService.save(updated);

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id_payment_method: number) {
    try {
      const result = await this.paymentMethodService.update(
        { id_payment_method },
        { is_eliminated: true }
      );
      if (result.affected === 0) throw new NotFoundException(`Payment method with id ${id_payment_method} not found`);
      return { message: 'Payment method was remove successfull' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
