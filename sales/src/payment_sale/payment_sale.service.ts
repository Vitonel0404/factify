import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentSaleDto } from './dto/create-payment_sale.dto';
import { UpdatePaymentSaleDto } from './dto/update-payment_sale.dto';
import { TENANT_CONNECTION } from 'src/provider/tenant.provider';
import { DataSource, Repository } from 'typeorm';
import { PaymentSale } from './entities/payment_sale.entity';

@Injectable()
export class PaymentSaleService {
  private readonly paymentSaleRepository: Repository<PaymentSale>

  constructor(@Inject(TENANT_CONNECTION) private readonly connection: DataSource) {
    this.paymentSaleRepository = this.connection.getRepository(PaymentSale);
  }


  create(createPaymentSaleDto: CreatePaymentSaleDto) {
    const new_paymentSale = this.paymentSaleRepository.create(createPaymentSaleDto);
    return this.paymentSaleRepository.save(new_paymentSale);
  }

  findAll() {
    return `This action returns all paymentSale`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentSale`;
  }

  update(id: number, updatePaymentSaleDto: UpdatePaymentSaleDto) {
    return `This action updates a #${id} paymentSale`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentSale`;
  }
}
